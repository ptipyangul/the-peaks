import React, { Component } from 'react';
import axios from 'axios';
import configs from '../../configs.json';
import layoutStyle from '../../layout.scss';
import classes from './Category.module.scss';
import NewsCard from "../../components/NewsCard/NewsCard";
import NewsSorting from '../../components/NewsSorting/NewsSorting';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryName: this.props.match.params.categoryName,
            news: null,
            error: true,
            sorting: 'newest',
            loading: true
        }
    }

    capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    handleSortingChanged = (event) => {
        this.setState({ sorting: event.target.value }, () => {
            this.getNews(this.props.sectionName);
        } );
    }

    getNews(sectionName) {
        let sectionNameParam = (this.state.categoryName == 'lifestyle') ? 'lifeandstyle' : this.state.categoryName;
        axios.get(
            configs.NEWS_API_ENDPOINT
            + '/search'
            + '?order-by='
            + this.state.sorting
            + '&section='
            +  sectionNameParam
            + '&show-fields=thumbnail%2CtrailText&page=1&page-size=9'
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

        let newsResults = <p>loading...</p>;

        if (!this.state.error && this.state.news) {           
            newsResults = this.state.news.map( (news, index) => {
                return <NewsCard 
                    key={news.id}
                    img={news.fields.thumbnail}
                    title={news.webTitle}
                    body={news.fields.trailText}
                    index={index}
                    newsId={news.id} />
            });
        }
        return (
            <div className="wrapper">
                <div className={classes.categoryContainer}>
                    <div className={classes.HeadingDiv}><h1>{this.capitalize(this.state.categoryName)}</h1></div>           
                    <div className={classes.newsSortingDiv}><NewsSorting changed={this.handleSortingChanged}/></div>
                </div>
                <div className={classes.searchResultsDiv}>
                    {newsResults}
                </div>    
            </div>
        )
    }
}

export default Category;