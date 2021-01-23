import React, { Component } from 'react';
import axios from 'axios';
import configs from '../../configs.json';
import appClasses from '../../App.module.scss';

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsId: null,
            content: null,
            error: true,
            loaded: false
        }
    }

    getArticle() {
        axios.get(
            configs.NEWS_API_ENDPOINT
            + '/'
            + this.state.newsId
            + '&api-key='
            + configs.NEWS_API_KEY)
            .then(response => {
                const content = response.data.response.content;
                this.setState({content: content, error: false, loaded: true});                
            })
            .catch(error => {
                this.setState({error: true});
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
        if (this.state.newsId && this.state.loaded === false) {
            //this.getArticle();
        }
    }
    
    render ()  {
        // Error checking
        if (!this.state.error && this.state.content) {
            console.log(this.state.content);
        }
        return (
            <div className={appClasses.wrapper}>
                <div>
                    <h1>Article page</h1>
                </div>
            </div>
        );
    }
}

export default Article;