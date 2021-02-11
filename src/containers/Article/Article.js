import React, { Component } from 'react';
import axios from 'axios';
import configs from '../../configs.json';
import './Article.scss';
import BookmarkButton from '../../components/BookmarkButton/BookmarkButton';
import Loader from "../../components/Loader/Loader";
import { Container } from 'react-bootstrap';

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsId: null,
            content: null,
            error: false,
            loaded: false,
            message: ''
        }
    }

    getArticle() {
        this.setState( { loading: true });
        axios.get(
            configs.NEWS_API_ENDPOINT
            + 'search?ids='
            + this.state.newsId
            + '&show-fields=body%2Cheadline%2Cbody%2Cthumbnail'
            + '&show-elements=image'
            + `&api-key=${configs.NEWS_API_KEY}`)
            .then(response => {
                const content = response.data.response.results[0];
                if (content.length <= 0) this.setState({ message: 'Content not found.' });
                this.setState({content: content,
                    message: '',
                    error: false,
                    loaded: true, 
                    loading: false });                
            })
            .catch(error => {
                if ( error ) {
                    this.setState({
                        error: true,
                        loading: false,
                        message: 'Something went wrong. Please try refreshing the page.'              
                    });
                }
            });
    }

    componentDidMount () {
        if (this.state.newsId == null) {
            let pathName = this.props.location.pathname.split("/");
            pathName.splice(0,2);
            let joinedId = pathName.join('/');
            this.setState({newsId: joinedId});
        }
    }

    componentDidUpdate(prevProps) {
        if (this.state.newsId && !this.state.loaded && !this.state.loading && !this.state.error) {
            this.getArticle();
        }
        if (this.state.content) {
            document.title = this.state.content.webTitle + ' | ' + configs.PAGE_TITLE;
        }
    }
    
    render ()  {

        let articleContent;

        // Error checking
        if (!this.state.error && this.state.content) {
            const content = this.state.content;
            const pubDate = new Date(content.webPublicationDate);         
            const formatedDate = pubDate.toUTCString().replace(/,/,'').toUpperCase();
            console.log(content);
            articleContent = (
                <div>
                    <BookmarkButton newsId={this.state.newsId} />
                    <div className="articleContent">                        
                        <p className="pubDate">{formatedDate}</p>
                        <h1 className="title">{content.webTitle}</h1>
                        <p className="headline">{content.fields.headline}</p>
                        <hr />
                        <img src={content.fields.thumbnail} class="thumbnail float-right"></img>
                        <div className="content" dangerouslySetInnerHTML={{__html: content.fields.body}} />
                    </div>
                </div>
            );
        } else {
            articleContent = (<div>{this.state.message}</div>);
        }

        return (
            <Container className="articlePage">
                {articleContent}
                <Loader isLoading={this.state.loading} />
            </Container>
        );
    }
}

export default Article;