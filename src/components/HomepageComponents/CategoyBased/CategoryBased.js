import React, { Component } from 'react';
import axios from 'axios';
import configs from '../../../configs.json';
import './CategoryBased.scss';
import Loader from "../../Loader/Loader";
import NewsCard from "../../NewsCard/NewsCard";

import { Row, Col, CardDeck } from 'react-bootstrap';

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
            +'&show-fields=thumbnail&page=1&page-size=6'
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
        let leftColNews, rightColNews;
        if (!this.state.error && this.state.news) { 
            // News items in card deck    
            let newsInCards = this.state.news.slice(0,3);      
            leftColNews = newsInCards.map( (news, index) => {
                return <NewsCard 
                    key={news.id}
                    newsId = {news.id}
                    img={news.fields.thumbnail}
                    title={news.webTitle}
                    body={news.fields.trailText}
                    index={index}
                    showImage={true} />
            });
            // News items in right col
            let newsInRightCol = this.state.news.slice(3,6);
            rightColNews = newsInRightCol.map( (news, index) => {
                return <NewsCard 
                    key={news.id}
                    newsId = {news.id}
                    img={news.fields.thumbnail}
                    title={news.webTitle}
                    body={news.fields.trailText}
                    index={index}
                    showImage={false} />
            });
        }
        return (
            <Row>
                <Loader isLoading={this.state.loading} />
                <Col sm={9}>
                    <CardDeck>
                        {leftColNews}                
                    </CardDeck>
                </Col>
                <Col className="rightColNews" sm={3}>
                    {rightColNews}
                </Col>
            </Row>
        )
    }
}

export default categoryBasedSections;