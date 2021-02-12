import React, { Component } from 'react';
import axios from 'axios';
import { GetNewsContext } from '../../../context/fetchNews';
import './CategoryBased.scss';
import Loader from "../../Loader/Loader";
import NewsCard from "../../NewsCard/NewsCard";
import { Row, Col, CardDeck } from 'react-bootstrap';

class categoryBasedSections extends Component {

    static contextType = GetNewsContext;

    constructor(props) {
        super(props);
        this.state = {
            news: null,
            error: true,
            loading: false
        }
        this.cancel = null;
    }

    getNews(sectionName) {
        if ( this.cancel ) this.cancel.cancel();
        this.cancel = axios.CancelToken.source();

        const qs = `search?section=${sectionName}`
                + `&order-by=newest`
                + `&show-fields=thumbnail&page=1&page-size=6`;
        const responseFunc = (response) => {
            const news = response.data.response.results;
            this.setState({news: news, error: false, loading: false});
        };
        const errorFunc = (error) => {
            this.setState({error: true, loading: false});
        }

        this.setState( { loading: true });
        this.context.fetchNews(qs, responseFunc, errorFunc, this.cancel);
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

        if (this.state.loading) {
            return <Loader isLoading={this.state.loading} />
        } else {
            return (
                <Row>
                    <Col md={12} lg={9}>
                        <CardDeck>
                            {leftColNews}                
                        </CardDeck>
                    </Col>
                    <Col lg={3} className="rightColNews d-none d-md-none d-lg-block">
                        {rightColNews}
                    </Col>
                </Row>
            )
        }
    }
}

export default categoryBasedSections;