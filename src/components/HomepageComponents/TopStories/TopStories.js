import React, { Component } from 'react';
import axios from 'axios';
import configs from '../../../configs.json';
import classes from './TopStories.module.scss';
import Loader from "../../Loader/Loader";
import NewsCard from "../../NewsCard/NewsCard";

class topStories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: null,
            error: false,
            sorting: 'newest',
            loading: false
        }
    }

    getNews() {
        this.setState( { loading: true });
        axios.get(
            configs.NEWS_API_ENDPOINT
            + '/search'
            + '?order-by='
            + this.state.sorting
            +'&show-fields=thumbnail%2CtrailText&page=1&page-size=8&show-section=true'
            + '&api-key='
            + configs.NEWS_API_KEY)
            .then(response => {
                const news = response.data.response.results;
                this.setState({news: news, error: false, loading: false});
            })
            .catch(error => {
                this.setState({ error: true, loading: false });
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
        
        let topNewsResults;

        let firstRowResults;
        let secondRowResults;

        if (!this.state.error && this.state.news) {
            let allnews = [...this.state.news];
            const firstHalf = allnews.splice(0, 5);
            const secondHalf = allnews.splice(-3);
            firstRowResults = firstHalf.map( (news, index) => {
                return <NewsCard 
                    key={news.id}
                    newsId = {news.id}
                    img={news.fields.thumbnail}
                    title={news.webTitle}
                    trailText={news.fields.trailText}
                    index={index}
                    linkClassName={classes['index'+ index]}/>                
            });
            secondRowResults = secondHalf.map( (news, index) => {
                return <NewsCard 
                    key={news.id}
                    newsId = {news.id}
                    img={news.fields.thumbnail}
                    title={news.webTitle}
                    trailText={news.fields.trailText}
                    index={index}
                    linkClassName={classes['index'+ index]}/>                
            });

        }
        if ( this.state.error && this.state.message && !this.state.loading) {
            topNewsResults = <p>{this.state.message}</p>;
        }
        return (
            <div>
                <div className={classes.topStoriesFirstRow}>                
                    {firstRowResults}
                </div>
                <div className={classes.topStoriesSecondRow}>
                    {secondRowResults}
                </div>
                <Loader isLoading={this.state.loading} />
            </div>
        )
    }
}

export default topStories;