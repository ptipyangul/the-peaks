import React, { Component } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import configs from '../../configs.json';
import appClasses from '../../App.module.scss';
import NewsCard from "../../components/NewsCard/NewsCard";

class Bookmark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            localBookmarks: null,
            loadedBookmarks: null,
            error: null,
            loading: true
        }
    }

    getBookmarks() {
        let localBookmarks = this.state.localBookmarks;
        let idsString = localBookmarks.join(",");
        axios.get(
            configs.NEWS_API_ENDPOINT
            + 'search?ids='
            + idsString
            +'&show-fields=thumbnail%2CtrailText'
            +'&show-elements=image'
            + '&api-key='
            + configs.NEWS_API_KEY)
            .then(response => {
                const data = response.data.response.results;
                this.setState({loadedBookmarks: data, error: false, loading: false});           
            })
            .catch(error => {
                console.log('error');
                this.setState({error: true});
            });
    }

    componentDidMount () {
        let bookmarks = this.getLocalStoredBookmark();
        if (bookmarks) {
            this.setState({ localBookmarks: bookmarks }, () => {
                this.getBookmarks();
            });            
        }
    }

    setLocalStoredBookmark (ids) {
        let obj = ['technology/2014/feb/17/flappy-bird-clones-apple-google',
                    'australia-news/live/2021/jan/25/australia-news-live-sa-nsw-victoria-heatwave-safety-warnings-covid-19-queensland-police-australia-day-invasion'];
        localStorage.setItem('bookmarks', JSON.stringify(obj));
    }

    getLocalStoredBookmark() {
        let bookmarks = localStorage.getItem('bookmarks');
        return JSON.parse(bookmarks);
    }

    render () {

        let newsResults = <p>loading...</p>;

        if (!this.state.error && this.state.loadedBookmarks) {           
            newsResults = this.state.loadedBookmarks.map( (news, index) => {
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
            <div className={appClasses.wrapper}>
                <div className="">
                    <h1>All Bookmarks</h1>
                    <ClipLoader loading={this.state.loading}/>
                    {newsResults}
                </div>
            </div>
        )
    }
}

export default Bookmark;