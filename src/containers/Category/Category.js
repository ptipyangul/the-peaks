import React, { Component } from 'react';
import axios from 'axios';
import configs from '../../configs.json';
import layoutStyle from '../../layout.scss';
import classes from './Category.module.scss';
import NewsCard from "../../components/NewsCard/NewsCard";
import NewsSorting from '../../components/NewsSorting/NewsSorting';
import Loader from "../../components/Loader/Loader";

class Category extends Component {
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

        if ( this.cancel ) {
            this.cancel.cancel();
        }
        this.cancel = axios.CancelToken.source();

        this.setState( { loading: true });

        let sectionNameParam = (categoryName == 'lifestyle') ? 'lifeandstyle' : categoryName;

        axios.get(
            configs.NEWS_API_ENDPOINT
            + 'search'
            + '?section='+  sectionNameParam
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
            .catch(error => {
                if (axios.isCancel(error) || error) {
                    this.setState({
                        error: true,
                        loading: false,
                        message: 'Something went wrong. Please try refreshing the page.'
                    })
                }
            });
    }

    handleScroll () {
        const { totalPage, page, loading, error } = this.state;
        if (totalPage <= page) return;
        if ( loading || error ) return;
        const lastElement = document.querySelector('div.' + `${classes.SearchResultsArea}` + ' > a:last-child');
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

    componentDidMount () {
        document.title = this.capitalize(this.state.categoryName) + ' | ' + configs.PAGE_TITLE;
        this.getNews();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render () {

        let newsResults;

        if ( !this.state.error && this.state.searchResults ) {           
            newsResults = this.state.searchResults.map( (news, index) => {
                return <NewsCard 
                    key={news.id}
                    img={news.fields.thumbnail}
                    title={news.webTitle}
                    body={news.fields.trailText}
                    index={index}
                    newsId={news.id} />
            });
        }
        if ( this.state.error && this.state.message ) {
            newsResults = <p>{this.state.message}</p>;
        }
        return (
            <div className="wrapper">
                <div className={classes.categoryContainer}>
                    <div className={classes.HeadingDiv}><h1>{this.capitalize(this.state.categoryName)}</h1></div>           
                    <div className={classes.newsSortingDiv}><NewsSorting changed={this.handleSortingChanged}/></div>
                </div>
                <div className={classes.SearchResultsArea}>
                    {newsResults}
                </div>
                <Loader isLoading={this.state.loading} />
            </div>
        )
    }
}

export default Category;