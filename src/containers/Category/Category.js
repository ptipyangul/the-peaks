import React, { Component } from 'react';
import axios from 'axios';
import configs from '../../configs.json';
import appClasses from '../../App.module.scss';
import classes from './Category.module.scss';
import NewsImageCard from "../../components/NewsImageCard/NewsImageCard";

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryName: this.props.match.params.categoryName,
            news: null,
            error: true
        }
    }

    capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    getNewsArticle(sectionName) {
        let sectionNameParam = (this.state.categoryName == 'lifestyle') ? 'lifeandstyle' : this.state.categoryName;
        axios.get(
            configs.NEWS_API_ENDPOINT
            + '?order-by=newest'
            + '&section='
            +  sectionNameParam
            + '&show-fields=thumbnail%2CtrailText&page=1&page-size=9'
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
        this.getNewsArticle(this.props.sectionName);
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
            <div className={appClasses.wrapper}>
                <div className="">
                    <h1>{this.capitalize(this.state.categoryName)}</h1>
                    {newsResults}
                </div>
            </div>
        )
    }
}

export default Category;