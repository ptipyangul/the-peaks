import React, { Component } from 'react';
import axios from 'axios';
import configs from '../../../configs.json';
import classes from './CategoryBased.module.scss';
import Loader from "../../Loader/Loader";
import NewsImageCard from "../../NewsCard/NewsCard";

class categoryBasedSections extends Component {

    constructor(props) {
        super(props);
        this.state = {
            news: null,
            error: true,
            loading: false
        }
    }

    getNews(sectionName) {
        this.setState( { loading: true });
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
                this.setState({error: true, loading: false});
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
            <div>
                <div className={classes.categoryContainer}>
                    {newsResults}                
                </div>
                <Loader isLoading={this.state.loading} />
            </div>
        )
    }
}

export default categoryBasedSections;