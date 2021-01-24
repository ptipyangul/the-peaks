import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import configs from '../../../configs.json';
import classes from './TopStories.module.scss';

import NewsImageCard from "../../NewsCard/NewsCard";

class topStories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: null,
            error: false,
            sorting: 'newest',
            loading: true
        }
    }

    getNews() {
        axios.get(
            configs.NEWS_API_ENDPOINT
            + '/search'
            + '?order-by='
            + this.state.sorting
            +'&show-fields=thumbnail%2CtrailText&page=1&page-size=8'
            + '&api-key='
            + configs.NEWS_API_KEY)
            .then(response => {
                const news = response.data.response.results;
                this.setState({news: news, error: false, loading: false});
            })
            .catch(error => {
                this.setState({error: true});
            });
    }

    componentDidMount () {
        this.getNews();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.sorting !== this.props.sorting) {
            this.setState({sorting: this.props.sorting}, () => {
                this.getNews();
            })
        }
    }

    render () {
        
        let topNewsResults = <p>Loading...</p>

        if (!this.state.error && this.state.news) {
            topNewsResults = this.state.news.map( (news, index) => {
                return <NewsImageCard 
                    key={news.id}
                    newsId = {news.id}
                    img={news.fields.thumbnail}
                    title={news.webTitle}
                    body={news.fields.trailText}
                    index={index} />                
            });
        }
        return (
            <div className="topStories">                
                {topNewsResults}
                <ClipLoader loading={this.state.loading}/>
            </div>
        )
    }
}

export default topStories;