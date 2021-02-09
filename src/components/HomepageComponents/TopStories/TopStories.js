import React, { Component } from 'react';
import axios from 'axios';
import configs from '../../../configs.json';
import classes from './TopStories.module.scss';
import Loader from "../../Loader/Loader";
import { Link } from 'react-router-dom';

class topStories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: null,
            error: false,
            loading: false,
            hightlightNews: null,
            rightColNews: null,
            flashNews: null
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
        const highlightNewsContent = <Link to={`/article/${highLightNewsData.newsId}`}>
                <div>
                    <img src={highLightNewsData.img} alt={highLightNewsData.title} />
                    <p>{highLightNewsData.title}</p>
                    <p>{highLightNewsData.trailText}</p>
                </div>
            </Link>;
        this.setState({ hightlightNews: highlightNewsContent });

        const rightColNews = this.normalizeNewsData(this.state.news.slice(1,4));
        const rightcolNewsContent = rightColNews.map( news => {
            return (
                <Link to={`/article/${news.newsId}`}>
                    <div>
                        <p>{news.title}</p>
                    </div>
                </Link>);
        });
        this.setState({ rightColNews: rightcolNewsContent });

        const flashNews = this.normalizeNewsData(this.state.news.slice(5,8));
        const flashNewsContent = flashNews.map( news => {
            return (
                <Link to={`/article/${news.newsId}`}>
                    <div>
                        <p>{news.title}</p>
                    </div>
                </Link>);
        });
        this.setState({ flashNews: flashNewsContent });
    }

    render () {
        return (
            <div>
                <div>
                    HightLight:
                    {this.state.hightlightNews}
                    Right News:
                    {this.state.rightColNews}
                    Flash news:
                    {this.state.flashNews}
                </div>
                <Loader isLoading={this.state.loading} />
            </div>
        )
    }
}

export default topStories;