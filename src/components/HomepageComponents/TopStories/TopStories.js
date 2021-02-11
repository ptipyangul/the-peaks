import React, { Component } from 'react';
import axios from 'axios';
import configs from '../../../configs.json';
import './TopStories.scss';
import { Link } from 'react-router-dom';
import NewsCard from "../../NewsCard/NewsCard";

import { Row, Col, Badge } from 'react-bootstrap';
import Loader from '../../Loader/Loader';

class topStories extends Component {
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
    }

    getNews() {
        this.setState( { loading: true });
        axios.get(
            configs.NEWS_API_ENDPOINT
            + '/search'
            +'?show-fields=thumbnail%2CtrailText&page=1&page-size=8&show-section=true'
            + '&api-key='
            + configs.NEWS_API_KEY)
            .then(response => {
                const news = response.data.response.results;
                this.setState({news: news, error: false, loading: false}, () => {
                    this.setUpNewsContent();
                });
            })
            .catch(error => {
                this.setState({ error: true, loading: false });
            });
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

    setUpNewsContent = () => {

        const highLightNewsData = this.normalizeNewsData([(this.state.news[0])])[0];
        const highlightNewsContent = <Link to={`/article/${highLightNewsData.newsId}`} key={highLightNewsData.id}> 
                <Row className="align-items-center">
                    <Col sm={6}><img src={highLightNewsData.img} alt={highLightNewsData.title} /></Col> 
                    <Col sm={6}>
                        <div className="highlightContent">
                            <Badge pill variant="success">LATEST</Badge>
                            <p className="title">{highLightNewsData.title}</p>
                            <p className="trailText">{highLightNewsData.trailText}</p>
                        </div>
                    </Col>
                </Row>
            </Link>;
        this.setState({ hightlightNews: highlightNewsContent });

        const rightColNews = this.normalizeNewsData(this.state.news.slice(1,4));
        const rightcolNewsContent = rightColNews.map( news => {
            return (
                <Link to={`/article/${news.newsId}`} key={news.id}>
                    <div>
                        <p>{news.title}</p>
                    </div>
                </Link>);
        });
        this.setState({ rightColNews: rightcolNewsContent });

        const mdMoreNews = rightColNews.map( news => {
            return <Col md={4}>
                <NewsCard 
                    key={news.id}
                    newsId = {news.newsId}
                    img={news.img}
                    title={news.title}
                    showImage={true} />
                </Col>
        });
        this.setState({ mdMoreNewsContent: mdMoreNews });

        const flashNews = this.normalizeNewsData(this.state.news.slice(5,8));
        const flashNewsContent = flashNews.map( news => {
            return (
                <Link to={`/article/${news.newsId}`} key={news.id}>
                    <span>{news.title}</span>
                </Link>);
        });
        this.setState({ flashNews: flashNewsContent });
    }

    render () {
        if (this.state.loading) {
            return <Loader isLoading={this.state.loading} />
        } else {
            return (
                <Row className="TopStoriesSection align-items-center ="> 
                    <Col md={12} lg={9}>
                        <div className="highlight">{this.state.hightlightNews}</div>
                        <div className="mdMoreNews d-lg-none d-xl-none">
                            <Row>
                                {this.state.mdMoreNewsContent}
                            </Row>
                        </div>
                        <div className="flashnews d-none d-lg-block d-xl-none">
                            <div className="track">
                                <div className="content">
                                    {this.state.flashNews}
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col sm={3} className="rightcol d-none d-lg-block d-xl-none">
                        {this.state.rightColNews}
                    </Col>
                </Row>
            )
        }
    }
}

export default topStories;