import React, { Component } from 'react';
import axios from 'axios';
import configs from '../../configs.json';
import appClasses from '../../App.module.scss';
import NewsImageCard from "../../components/NewsCard/NewsCard";
import Loader from "../../components/Loader/Loader";

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKey: '',
            loading: false,
            error: false,
            searchResults: [],
            sorting: 'newest',
            perPage: 2,
            page: 1,
            totalPage: null,
            scrolling: false
        }
        this.cancel = null;
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
            + `search?q=${searchKey}`
            + `&order-by=${sorting}`
            + `&show-fields=thumbnail%2CtrailText&page=${page}&page-size=${perPage}`
            + `&api-key=${configs.NEWS_API_KEY}`
            ,{ cancelToken: this.cancel.token })
            .then(response => {
                const data = [...searchResults, ...response.data.response.results];
                this.setState({ searchResults: data, 
                                error: false,
                                loading: false, 
                                scrolling: false,
                                totalPage: response.data.response.pages });
            })
            .catch(error => {
                this.setState({error: true});
                if (axios.isCancel(error) || error) {
                    this.setState({
                        error: true
                    })
                }
            });
    }

    handleScroll = (e) => {
        const { scolling, totalPage, page, loading } = this.state;
        if (scolling) return;
        if (totalPage <= page) return;
        if (loading) return;
        const lastElement = document.querySelector('div.SearchResultsArea > a:last-child');
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
        this.scrollListener = window.addEventListener('scroll', (e) => {
            this.handleScroll(e);
        })
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
                        perPage: 2,
                        page: 1,
                        totalPage: null,
                        scrolling: false
                    }, () => {
            this.getSearchResults();
        });
    }

    loadMore = () => {
        this.setState(prevState => ({ 
            page: prevState.page + 1,
            scrolling: true
         }), this.getSearchResults);
    }

    render () {
        let results = <p>Loading...</p>

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

        return (
            <div>
                <div className={appClasses.wrapper}>
                <h1>Search Result</h1>
                        <input
                            type="text"
                            placeholder="Search"
                            onChange={event => this.handleSearchBoxChanged(event)}/> <br />
                    <div className="SearchResultsArea">
                        {results}
                    </div>
                    <Loader isLoading={this.state.loading} />
                </div>
            </div>
        );
    }
}

export default SearchResult;