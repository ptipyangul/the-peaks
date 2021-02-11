import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import configs from '../../configs.json';
import '../SearchResult/SearchResult.scss';
import NewsCard from "../../components/NewsCard/NewsCard";
import NewsSorting from '../../components/NewsSorting/NewsSorting';
import Loader from "../../components/Loader/Loader";
import { Container, Row, Col } from 'react-bootstrap';

class SearchResult extends Component {

    pageTitle = 'Search Result';

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
                if ( data.length  <= 0) this.setState({ message: 'No results' });                
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
                        error: true
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

    handleSortingChanged = (event) => {
        if (!this.state.error) {
            this.setState({ sorting: event.target.value,
                            error: false,
                            searchResults: [],
                            page: 1,
                            totalPage: null,
                            scrolling: false
            }, () => {
                this.getSearchResults();
            } );
        }
    }

    handleScroll = (e) => {
        const { scrolling, totalPage, page, loading, error } = this.state;
        if (totalPage <= page) return;
        if (scrolling || loading || error ) return;
        const lastElement = document.querySelector('.card:last-child');
        const lastElementOffset = lastElement.offsetTop + lastElement.clientHeight;
        const pageOffset = window.pageYOffset + window.innerHeight;
        let bottomOffset = 20;
        if (pageOffset > lastElementOffset - bottomOffset) this.loadMore();
    }

    componentDidMount() {
        document.title = this.pageTitle + ' | ' + configs.PAGE_TITLE;
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
        if ( prevProps.searchKey != this.props.searchKey ) {
            if ( this.props.searchKey.length >= 1 ) {
                this.setState({ searchKey: this.props.searchKey,
                    error: false,
                    searchResults: [],
                    sorting: 'newest',
                    page: 1,
                    totalPage: null,
                    scrolling: false
                }, () => {
                    this.getSearchResults();
                });
            } else {
                if ( this.cancel ) {
                    this.cancel.cancel();
                }
                this.cancel = axios.CancelToken.source();
                this.setState({ searchKey: null,
                    error: false,
                    searchResults: [],
                    sorting: 'newest',
                    page: 1,
                    totalPage: null,
                    scrolling: false,
                    loading: false,
                    message: 'No results.'
                });
            }

        }
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
                return <Col lg={4} md={6} xs={12}>
                        <NewsCard 
                            key={news.id}
                            newsId = {news.id}
                            img={news.fields.thumbnail}
                            title={news.webTitle}
                            body={news.fields.trailText}
                            index={index}
                            showImage={true} />
                        </Col>
            });
        }
        if ( this.state.error && this.state.message && !this.state.loading) {
            results = <p>{this.state.message}</p>;
        }

        return (
            <Container className="searchPageContainer">
                <Row className="PageHeaderRow align-items-center">
                    <Col sm={10}><h1>Search Result</h1></Col>           
                    <Col sm={2}><NewsSorting changed={this.handleSortingChanged}/></Col>
                </Row>
                <Row className="SearchResultsArea">
                    {results}
                </Row>
                <Loader isLoading={this.state.loading} />
            </Container>            
        );
    }
}

export default SearchResult;