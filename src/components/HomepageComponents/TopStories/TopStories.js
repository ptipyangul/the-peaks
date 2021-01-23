import React, { Component } from 'react';
import axios from 'axios';
import configs from '../../../configs.json';
import classes from './TopStories.css';

import NewsImageCard from "../../NewsImageCard/NewsImageCard";

class topStories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: null,
            error: false,
            sorting: 'newest'
        }
    }

    getNews(sorting) {
        axios.get(
            configs.NEWS_API_ENDPOINT
            + '?order-by='
            + this.state.sorting
            +'&show-fields=thumbnail%2CtrailText&page=1&page-size=8'
            + '&api-key='
            + configs.NEWS_API_KEY)
            .then(response => {
                const news = response.data.response.results;
                this.setState({news: news, error: false});
            })
            .catch(error => {
                this.setState({error: true});
            });
    }

    componentDidMount () {
        this.getNews(this.state.sorting);
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps);
        if (prevProps.sorting !== this.props.sorting) {
            this.setState({sorting: this.props.sorting}, () => {
                this.getNews(this.state.sorting);
            })
        }
    }

    render () {
        
        let topNewsResults = <p>Loading...</p>

        if (!this.state.error && this.state.news) {
            topNewsResults = this.state.news.map( (news, index) => {
                return <NewsImageCard 
                    key={news.id}
                    img={news.fields.thumbnail}
                    title={news.webTitle}
                    body={news.fields.trailText}
                    index={index} />
            });
        }
        return (
            <div className="topStories">
                {topNewsResults}
            </div>
        )
        
    }
}

export default topStories;