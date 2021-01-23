import React, { Component } from 'react';
import axios from 'axios';
import configs from '../../../configs.json';

import classes from './CategoryBased.css';

import NewsImageCard from "../../NewsImageCard/NewsImageCard";

class categoryBasedSections extends Component {

    constructor(props) {
        super(props);
        this.state = {
            news: null,
            error: true
        }
    }

    getNews(sectionName) {
        axios.get(
            configs.NEWS_API_ENDPOINT
            + '?order-by=newest'
            + '&section='
            + sectionName
            +'&show-fields=thumbnail%2CtrailText&page=1&page-size=3'
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
        this.getNews(this.props.sectionName);
    }

    render () {

        let newsResults = <p>loading...</p>;

        if (!this.state.error && this.state.news) {           
            newsResults = this.state.news.map( (news, index) => {
                return <NewsImageCard 
                    key={news.id}
                    img={news.fields.thumbnail}
                    title={news.webTitle}
                    body={news.fields.trailText}
                    index={index} />
            });
        }
        return (
            <div className="categoryContainer">
                {newsResults}
            </div>
        )
    }
}

export default categoryBasedSections;