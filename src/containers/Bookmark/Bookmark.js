import React, { Component } from 'react';
import axios from 'axios';
import configs from '../../configs.json';
import Loader from "../../components/Loader/Loader";
import NewsCard from "../../components/NewsCard/NewsCard";
import NewsSorting from '../../components/NewsSorting/NewsSorting';
import { GetNewsContext } from '../../context/fetchNews';
import './Bookmark.scss';
import { Container, Row, Col } from 'react-bootstrap';

class Bookmark extends Component {

    pageTitle = "All Bookmark | ";
    static contextType = GetNewsContext;

    constructor(props) {
        super(props);
        this.state = {
            localBookmarks: null,
            loadedBookmarks: null,
            error: null,
            loading: false,
            sorting: 'newest',
            message: ''
        }
        this.cancel = null;
    }

    getBookmarks() {
        const localBookmarks = this.state.localBookmarks;
        let idsString = null;
        if (localBookmarks)
            idsString = localBookmarks.join(",");

        if ( this.cancel ) this.cancel.cancel();
        this.cancel = axios.CancelToken.source();
        
        const qs = `search?ids=${idsString}`
                + `&order-by=${this.state.sorting}`
                + `&show-fields=thumbnail%2CtrailText'`
                + '&show-elements=image';

        const responseFunc = (response) => {
            const data = response.data.response.results;
            if ( data.length <= 0 ) {
                this.setState({ message: 'No bookmark.' });
            }
            this.setState({loadedBookmarks: data, error: false, loading: false});     
        }
        const errorFunc = (error) => {
            this.setState({error: true });
        }

        this.setState({ loading: true });
        this.context.fetchNews(qs, responseFunc, errorFunc, this.cancel)
    }

    componentDidMount () {
        document.title = this.pageTitle + configs.PAGE_TITLE;

        let bookmarks = this.getLocalStoredBookmark();
         if (bookmarks) {
            this.setState({ localBookmarks: bookmarks }, () => {
                this.getBookmarks();
            });            
        } else {
            this.setState({ message: 'No bookmark.'});
        }
    }

    componentDidUpdate(prevProps) {
    }

    getLocalStoredBookmark() {
        let bookmarks = localStorage.getItem('bookmarks');
        return JSON.parse(bookmarks);
    }

    handleSortingChanged = (event) => {
        if (event.target.value !== this.state.sorting) {
            this.setState({ sorting: event.target.value }, () => {
                this.getBookmarks();
            });
        }
    }

    render () {

        let newsResults = <Col>{this.state.message}</Col>;

        if (!this.state.error && this.state.loadedBookmarks) {           
            if (this.state.loadedBookmarks.length > 0 ) { 
                newsResults = this.state.loadedBookmarks.map( (news, index) => {
                    return <Col lg={4} md={6} xs={12} key={news.id}>
                            <NewsCard 
                                img={news.fields.thumbnail}
                                title={news.webTitle}
                                body={news.fields.trailText}
                                index={index}
                                newsId={news.id}
                                showImage={true} />
                        </Col>
                });
            }
        }

        return (
            <Container>
                <Row className="PageHeaderRow align-items-center">
                    <Col sm={10}><h1>Bookmark</h1></Col>           
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

export default Bookmark;