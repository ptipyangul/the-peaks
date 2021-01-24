import React, { Component } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import configs from '../../../configs.json';
import classes from './CategoryBased.module.scss';
import NewsImageCard from "../../NewsCard/NewsCard";

class categoryBasedSections extends Component {

    constructor(props) {
        super(props);
        this.state = {
            news: null,
            error: true,
            loading: true
        }
    }

    getNews(sectionName) {
        axios.get(
            configs.NEWS_API_ENDPOINT
            + '/search'
            + '?order-by=newest'
            + '&section='
            + sectionName
            +'&show-fields=thumbnail%2CtrailText&page=1&page-size=3'
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
        this.getNews(this.props.sectionName);
    }

    render () {

        let newsResults;

        if (!this.state.error && this.state.news) {           
            newsResults = this.state.news.map( (news, index) => {
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
            <div className={classes.categoryContainer}>
                <ClipLoader loading={this.state.loading} />
                {newsResults}                
            </div>
        )
    }
}

export default categoryBasedSections;