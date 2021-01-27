import React, { Component } from 'react';
import axios from 'axios';
import configs from '../../configs.json';
import layout from '../../layout.scss';
import Loader from "../../components/Loader/Loader";
import NewsCard from "../../components/NewsCard/NewsCard";
import NewsSorting from '../../components/NewsSorting/NewsSorting';
import classes from './Bookmark.module.scss';

class Bookmark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            localBookmarks: null,
            loadedBookmarks: null,
            error: null,
            loading: false,
            sorting: 'newest'
        }
        const sorting = 'newest';
    }

    getBookmarks() {
        let localBookmarks = this.state.localBookmarks;
        let idsString = localBookmarks.join(",");
        this.setState({ loading: true });
        axios.get(
            configs.NEWS_API_ENDPOINT
            + 'search?ids='
            + idsString
            + '&order-by=' + this.state.sorting
            +'&show-fields=thumbnail%2CtrailText'
            +'&show-elements=image'
            + '&api-key=' + configs.NEWS_API_KEY)
            .then(response => {
                const data = response.data.response.results;
                this.setState({loadedBookmarks: data, error: false, loading: false});           
            })
            .catch(error => {
                this.setState({error: true });
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
            <div className="wrapper">
                <div className={classes.bookmarkContainer}>
                    <div className={classes.HeadingDiv}><h1>All Bookmark</h1></div>           
                    <div className={classes.newsSortingDiv}><NewsSorting changed={this.handleSortingChanged}/></div>
                </div>
                <div className={classes.bookmarkResult}>
                    {newsResults}
                </div>
                <Loader isLoading={this.state.loading} />
            </div>
        )
    }
}

export default Bookmark;