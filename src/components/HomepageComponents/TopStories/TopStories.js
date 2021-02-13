import React, { Component } from 'react';
import axios from 'axios';
import './TopStories.scss';
import { Link } from 'react-router-dom';
import NewsCard from "../../NewsCard/NewsCard";
import { GetNewsContext } from '../../../context/fetchNews';

import { Row, Col, Badge } from 'react-bootstrap';
import Loader from '../../Loader/Loader';

class topStories extends Component {
    static contextType = GetNewsContext;

    constructor(props) {
        super(props);
        this.state = {
            news: null,
            error: false,
            loading: false,
            hightlightNews: null,
            rightColNews: null,
            flashNews: null,
            mdMoreNewsContent: null
        }
        this.cancel = null;
    }

    getNews() {
        if ( this.cancel ) this.cancel.cancel();
        this.cancel = axios.CancelToken.source();

        const qs = 'search?show-fields=thumbnail%2CtrailText&page=1&page-size=8&show-section=true';
        const responseFunc = (response) => {
            const news = response.data.response.results;
            this.setState({news: news, error: false, loading: false}, () => {
                this.setUpNewsContent();
            });
        }
        const errorFunc = (error) => {
            this.setState({ error: true, loading: false, message: 'Something went wrong. Please try again' });
        }

        this.setState( { loading: true });
        this.context.fetchNews(qs, responseFunc, errorFunc, this.cancel);
    }

    componentDidMount () {
        this.getNews();
    }

    normalizeNewsData = (newsArray) => {
        const array = newsArray.map( news => {
            return {
                img: news.fields.thumbnail,
                trailText: news.fields.trailText,
                title: news.webTitle,
                newsId: news.id
            };
        });
        return array;
    }

    // Create news content
    setUpNewsContent = () => {
        // Hightlight news
        const highLightNewsData = this.normalizeNewsData([(this.state.news[0])])[0];
        const highlightNewsContent = <Link to={`/article/${highLightNewsData.newsId}`} key={highLightNewsData.id}> 
                <Row className="align-items-center">
                    <Col md={6} key='hightlistNewsTitle'><img src={highLightNewsData.img} alt={highLightNewsData.title} /></Col> 
                    <Col md={6} key='hightlistNewsContent'>
                        <div className="highlightContent">
                            <Badge pill variant="success">LATEST</Badge>
                            <p className="title">{highLightNewsData.title}</p>
                            <p className="trailText">{highLightNewsData.trailText.replace(/(<([^>]+)>)/gi, "")}</p>
                        </div>
                    </Col>
                </Row>
            </Link>;
        this.setState({ hightlightNews: highlightNewsContent });

        // Right columns news
        const rightColNews = this.normalizeNewsData(this.state.news.slice(1,4));
        const rightcolNewsContent = rightColNews.map( news => {
            return (
                <Link to={`/article/${news.newsId}`} key={news.newsId}>
                    <div>
                        <p>{news.title}</p>
                    </div>
                </Link>);
        });
        this.setState({ rightColNews: rightcolNewsContent });

        // More news for smaller screen
        const mdMoreNews = rightColNews.map( news => {
            return <Col md={4} key={`mdMoreNew${news.newsId}`}>
                <NewsCard 
                    newsId = {news.newsId}
                    img={news.img}
                    title={news.title}
                    showImage={true} />
                </Col>
        });
        this.setState({ mdMoreNewsContent: mdMoreNews });

        // Flash news
        const flashNews = this.normalizeNewsData(this.state.news.slice(5,8));
        const flashNewsContent = flashNews.map( news => {
            return (
                <Link to={`/article/${news.newsId}`} key={news.newsId}>
                    <span>{news.title}</span>
                </Link>);
        });
        this.setState({ flashNews: flashNewsContent });
    }

    render () {
        if ( this.state.loading ) {
            return <Loader isLoading={this.state.loading} />
        } else if ( this.state.error && this.state.message ) {
            return <Row><Col>{this.state.message}</Col></Row>
        } else {
            return (
                <Row className="TopStoriesSection align-items-center"> 
                    <Col md={12} lg={9}>
                        <div className="highlight">{this.state.hightlightNews}</div>
                        <div className="mdMoreNews d-lg-none d-xl-none">
                            <Row>
                                {this.state.mdMoreNewsContent}
                            </Row>
                        </div>
                        <div className="flashnews d-none d-lg-block d-xl-block d-xl-none">
                            <div className="track">
                                <div className="content">
                                    {this.state.flashNews}
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col sm={3} className="rightcol d-none d-lg-block d-xl-block d-xl-none">
                        {this.state.rightColNews}
                    </Col>
                </Row>
            )
        }
    }
}

export default topStories;