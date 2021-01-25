import React, { Component } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import configs from '../../configs.json';
import appClasses from '../../App.module.scss';
import NewsCard from "../../components/NewsCard/NewsCard";
import NewsSorting from '../../components/NewsSorting/NewsSorting';

class Bookmark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            localBookmarks: null,
            loadedBookmarks: null,
            error: null,
            loading: true,
            sorting: 'newest'
        }
        const sorting = 'newest';
    }

    getBookmarks() {
        let localBookmarks = this.state.localBookmarks;
        let idsString = localBookmarks.join(",");
        axios.get(
            configs.NEWS_API_ENDPOINT
            + 'search?ids='
            + idsString
            + '&order-by='
            + this.state.sorting
            +'&show-fields=thumbnail%2CtrailText'
            +'&show-elements=image'
            + '&api-key='
            + configs.NEWS_API_KEY)
            .then(response => {
                const data = response.data.response.results;
                this.setState({loadedBookmarks: data, error: false, loading: false});           
            })
            .catch(error => {
                this.setState({error: true});
            });
    }

    componentDidMount () {
        let bookmarks = this.getLocalStoredBookmark();
        if (bookmarks) {
            this.setState({ localBookmarks: bookmarks }, () => {
                this.getBookmarks();
                // apply loading..
            });            
        }
    }

    componentDidUpdate(prevProps) {
    }

    getLocalStoredBookmark() {
        let bookmarks = localStorage.getItem('bookmarks');
        return JSON.parse(bookmarks);
    }

    handleSortingChanged = (event) => {
        if (event.target.value != this.state.sorting) {
            this.setState({ sorting: event.target.value }, () => {
                this.getBookmarks();
            });
        }
    }

    render () {

        let newsResults;

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
                    <NewsSorting changed={this.handleSortingChanged}/>
                    {newsResults}
                </div>
            </div>
        )
    }
}

export default Bookmark;