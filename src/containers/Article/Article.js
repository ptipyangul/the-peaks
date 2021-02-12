import React, { Component } from 'react';
import axios from 'axios';
import configs from '../../configs.json';
import './Article.scss';
import BookmarkButton from '../../components/BookmarkButton/BookmarkButton';
import Loader from "../../components/Loader/Loader";
import { GetNewsContext } from '../../context/fetchNews';
import { Container } from 'react-bootstrap';

class Article extends Component {

    static contextType = GetNewsContext;

    constructor(props) {
        super(props);
        this.state = {
            newsId: null,
            content: null,
            error: false,
            loaded: false,
            message: ''
        }
        this.cancel = null;
    }

    getArticle() {      

        if ( this.cancel ) this.cancel.cancel();
        this.cancel = axios.CancelToken.source();

        const responseFun = (response) => {
            const content = response.data.response.results[0];
            if (content.length <= 0) this.setState({ message: 'Content not found.' });
            this.setState({content: content,
                message: '',
                error: false,
                loaded: true, 
                loading: false });     
        }
        const errorFunc = (error) => {
            if ( error ) {
                this.setState({
                    error: true,
                    loading: false,
                    message: 'Something went wrong. Please try refreshing the page.'              
                });
            }
        }
        const qs = `search?ids=${this.state.newsId}`
            + `&show-fields=body%2Cheadline%2Cbody%2Cthumbnail`;
        
        this.setState( { loading: true });
        this.context.fetchNews(qs, responseFun, errorFunc, this.cancel);
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
            articleContent = (
                <div>
                    <BookmarkButton newsId={this.state.newsId} />
                    <div className="articleContent">                        
                        <p className="pubDate">{formatedDate}</p>
                        <h1 className="title">{content.webTitle}</h1>
                        <p className="headline">{content.fields.headline}</p>
                        <hr />
                        <img src={content.fields.thumbnail} class="thumbnail float-right" alt={content.webTitle}></img>
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