import React, { Component } from 'react';
import axios from 'axios';
import configs from '../../configs.json';
import layoutStyle from '../../layout.scss';
import appClasses from '../../App.module.scss';
import classes from '../SearchResult/SearchResult.module.scss';
import NewsImageCard from "../../components/NewsCard/NewsCard";
import NewsSorting from '../../components/NewsSorting/NewsSorting';
import Loader from "../../components/Loader/Loader";

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKey: '',
            sorting: 'newest',

            searchResults: [],

            loading: false,
            scrolling: false,
            
            error: false,
            message: '',

            perPage: configs.LOAD_PER_PAGE,
            page: 1,
            totalPage: null,            
        }
        this.cancel = null;
        this.handleScroll = this.handleScroll.bind(this);
    }

    parseParams = (querystring) => {
        const params = new URLSearchParams(querystring);    
        const obj = {};
        for (const key of params.keys()) {
            if (params.getAll(key).length > 1) {
                obj[key] = params.getAll(key);
            } else {
                obj[key] = params.get(key);
            }
        }    
        return obj;
    };

    getSearchResults() {
        const { searchKey, perPage, page, searchResults, sorting } = this.state;

        if ( this.cancel ) {
            this.cancel.cancel();
        }

        this.cancel = axios.CancelToken.source();

        this.setState( { loading: true });

        axios.get(
            configs.NEWS_API_ENDPOINT
            + 'search'
            + `?q=${searchKey}`
            + `&order-by=${sorting}`
            + `&show-fields=thumbnail%2CtrailText&page=${page}&page-size=${perPage}`
            + `&api-key=${configs.NEWS_API_KEY}`
            ,{ cancelToken: this.cancel.token })
            .then(response => {
                const data = [...searchResults, ...response.data.response.results];
                this.setState({ searchResults: data, 
                                error: false,
                                message: null,
                                loading: false,
                                scrolling: false,
                                totalPage: response.data.response.pages });
            })
            .catch( error => {
                if (axios.isCancel(error)) {
                    this.setState({
                        error: true,
                        message: 'Something went wrong. Please try refreshing the page.'
                    });
                } else if ( error ) {
                    this.setState({
                        error: true,
                        loading: false,
                        message: 'Something went wrong. Please try refreshing the page.'              
                    });
                }
            });
    }

    handleScroll = (e) => {
        const { scrolling, totalPage, page, loading, error } = this.state;
        if (totalPage <= page) return;
        if (scrolling || loading || error ) return;
        const lastElement = document.querySelector('div.' + `${classes.SearchResultsArea}` + ' > a:last-child');
        const lastElementOffset = lastElement.offsetTop + lastElement.clientHeight;
        const pageOffset = window.pageYOffset + window.innerHeight;
        let bottomOffset = 20;
        if (pageOffset > lastElementOffset - bottomOffset) this.loadMore();
    }

    componentDidMount() {
        if (this.state.searchKey == null) {
            let qs = this.parseParams(this.props.location.search);
            if (qs.q) {
                this.setState({ searchKey: qs.q });
            }
        }
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    componentDidUpdate(prevProps) {
        /*if ( prevProps.location.search != this.props.location.search
            && this.state.searchKey
            && this.state.loading == false
            && !this.state.error) {
            this.getSearchResults();
        }
        if ( this.state.searchKey
            && !this.state.error ) {
                this.getSearchResults();
        }*/
    }

    handleSearchBoxChanged(event) {
        this.setState({ searchKey: event.target.value,
                        error: false,
                        searchResults: [],
                        sorting: 'newest',
                        page: 1,
                        totalPage: null,
                        scrolling: false
                    }, () => {
            this.getSearchResults();
        });
    }

    loadMore = () => {
        this.setState({ 
            page: this.state.page + 1,
            scrolling: true
         }, () => {
            this.getSearchResults()
         });
    }

    render () {
        let results;

        if (!this.state.error && this.state.searchResults) {
            results = this.state.searchResults.map( (news, index) => {
                return <NewsImageCard 
                    key={news.id}
                    newsId = {news.id}
                    img={news.fields.thumbnail}
                    title={news.webTitle}
                    body={news.fields.trailText}
                    index={index} />
            });
        }
        if ( this.state.error && this.state.message && !this.state.loading) {
            results = <p>{this.state.message}</p>;
        }

        return (
            <div className="wrapper">
                <input
                type="text"
                placeholder="Search"
                onChange={event => this.handleSearchBoxChanged(event)}/> <br />

                <div className={classes.searchContainer}>
                    <div className={classes.HeadingDiv}><h1>Search Result</h1></div>           
                    <div className={classes.newsSortingDiv}><NewsSorting changed={this.handleSortingChanged}/></div>
                </div>
                <div className={classes.SearchResultsArea}>
                    {results}
                </div>
                <Loader isLoading={this.state.loading} />
            </div>
        );
    }
}

export default SearchResult;