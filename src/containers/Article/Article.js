import React, { Component } from 'react';
import axios from 'axios';
import configs from '../../configs.json';
import layoutStyle from '../../layout.scss';
import classes from '../Article/Article.module.scss';
import BookmarkButton from '../../components/BookmarkButton/BookmarkButton';
import Loader from "../../components/Loader/Loader";

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
            + '&show-fields=body%2Cheadline%2Cbody'
            + '&show-elements=image'
            + `&api-key=${configs.NEWS_API_KEY}`)
            .then(response => {
                const content = response.data.response.results[0];
                this.setState({content: content,
                    message: null,
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
            let content = this.state.content;
            let pubDate = new Date(content.webPublicationDate);         
            let formatedDate = pubDate.toUTCString().replace(/,/,'').toUpperCase();
            articleContent = (
            <div className={classes.articleContent}>
                <p className={classes.pubDate}>{formatedDate}</p>
                <h1 className={classes.title}>{content.webTitle}</h1>
                <p className={classes.headline}>{content.fields.headline}</p>
                <hr />
                <div className={classes.content} dangerouslySetInnerHTML={{__html: content.fields.body}} />
            </div>
            );
        }
        return (
            <div className={classes.articlePage}>
                <div className="wrapper">
                    <BookmarkButton newsId={this.state.newsId} />
                    {articleContent}
                    <Loader isLoading={this.state.loading} />
                </div>
            </div>
        );
    }
}

export default Article;