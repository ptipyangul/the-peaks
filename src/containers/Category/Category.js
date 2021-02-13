import React, { Component } from 'react';
import axios from 'axios';
import './Category.scss';
import NewsCard from "../../components/NewsCard/NewsCard";
import NewsSorting from '../../components/NewsSorting/NewsSorting';
import Loader from "../../components/Loader/Loader";
import { GetNewsContext } from '../../context/fetchNews';
import configs from '../../configs.json';

import { Row, Col, Container } from 'react-bootstrap';

class Category extends Component {

    _isMounted = false;
    static contextType = GetNewsContext;

    constructor(props) {
        super(props);
        this.state = {
            categoryName: this.props.match.params.categoryName,
            sorting: 'newest',

            searchResults: [],

            loading: false,
            scrolling: false,

            error: true,           
            message: '',

            perPage: configs.LOAD_PER_PAGE,
            page: 1,
            totalPage: null
        }
        this.cancel = null;
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount () {
        this._isMounted = true;
        document.title = this.capitalize(this.state.categoryName) + ' | ' + configs.PAGE_TITLE;
        this.getNews();
        window.addEventListener('scroll', this.handleScroll);
    }

    capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
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
                this.getNews();
            } );
        }
    }

    getNews() {
        const { categoryName, perPage, page, searchResults, sorting } = this.state;
        const sectionNameParam = (categoryName === 'lifestyle') ? 'lifeandstyle' : categoryName;

        if ( this.cancel ) this.cancel.cancel();
        this.cancel = axios.CancelToken.source();

        const qs = `search?section=${sectionNameParam}`
                + `&order-by=${sorting}`
                + `&show-fields=thumbnail%2CtrailText&page=${page}&page-size=${perPage}`;
        const responseFunc = (response) => {
            const data = [...searchResults, ...response.data.response.results];
            this.setState({ searchResults: data, 
                            error: false,
                            message: null,
                            loading: false,
                            scrolling: false,
                            totalPage: response.data.response.pages });
        };
        const errorFunc = (error) => {
            if (axios.isCancel(error) || error) {
                this.setState({
                    error: true,
                    loading: false,
                    message: 'Something went wrong. Please try refreshing the page.'
                })
            }
        };

        this.setState( { loading: true });
        this.context.fetchNews(qs, responseFunc, errorFunc, this.cancel)
    }

    handleScroll () {
        const { totalPage, page, loading, error } = this.state;
        if (totalPage <= page) return;
        if ( loading || error ) return;
        const lastElement = document.querySelector('.card:last-child');
        const lastElementOffset = lastElement.offsetTop + lastElement.clientHeight;
        const pageOffset = window.pageYOffset + window.innerHeight;
        let bottomOffset = 20;
        if (pageOffset > lastElementOffset - bottomOffset) this.loadMore();
    }

    loadMore = () => {
        this.setState({ 
            page: this.state.page + 1,
            scrolling: true
         }, () => {
            this.getNews()
         });
    }

    componentWillUnmount() {
        this._isMounted = false;
        window.removeEventListener('scroll', this.handleScroll);
    }

    render () {

        let newsResults = <Col>{this.state.message}</Col>;

        if ( !this.state.error && this.state.searchResults ) {           
            newsResults = this.state.searchResults.map( (news, index) => {
                return <Col lg={4} md={6} xs={12} key={news.id}>
                        <NewsCard 
                        img={( news.fields && news.fields.thumbnail ) ? news.fields.thumbnail : ''}
                        title={news.webTitle}
                        body={( news.fields && news.fields.trailText ) ? news.fields.trailText : ''}
                        index={index}
                        newsId={news.id}
                        showImage={true} />
                    </Col>
            });
        }

        return (
            <Container className="CategoryContainer">
                <Row className="PageHeaderRow align-items-center">
                    <Col sm={10}><h1>{this.capitalize(this.state.categoryName)}</h1></Col>           
                    <Col sm={2}><NewsSorting changed={this.handleSortingChanged}/></Col>
                </Row>
                <Row className="SearchResultsArea">
                    {newsResults}
                </Row>
                <Loader isLoading={this.state.loading} />
            </Container>
        )
    }
}

export default Category;