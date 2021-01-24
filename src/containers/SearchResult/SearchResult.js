import React, { Component } from 'react';
import axios from 'axios';
import configs from '../../configs.json';
import appClasses from '../../App.module.scss';

import NewsImageCard from "../../components/NewsCard/NewsCard";

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKey: null,
            searched: false,
            error: false,
            searchResults: null
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

        if ( this.cancel ) {
            this.cancel.cancel();
        }

        this.cancel = axios.CancelToken.source();

        axios.get(
            configs.NEWS_API_ENDPOINT
            + '/search'
            + '?q='
            + this.state.searchKey
            + 'order-by='
            + this.state.sorting
            +'&show-fields=thumbnail%2CtrailText&page=1&page-size=10'
            + '&api-key='
            + configs.NEWS_API_KEY
            ,{ cancelToken: this.cancel.token })
            .then(response => {
                const searchResults = response.data.response.results;
                this.setState({ searchResults: searchResults, error: false, searched: true });
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

    componentDidMount() {
        if (this.state.searchKey == null) {
            let qs = this.parseParams(this.props.location.search);
            if (qs.q) {
                this.setState({ searchKey: qs.q });
            }
        }
    }

    componentDidUpdate(prevProps) {
        /*if ( prevProps.location.search != this.props.location.search
            && this.state.searchKey
            && this.state.searched == false
            && !this.state.error) {
            this.getSearchResults();
        }
        if ( this.state.searchKey
            && !this.state.error ) {
                this.getSearchResults();
        }*/
    }

    handleSearchBoxChanged(event) {
        this.setState({ searchKey: event.target.value });
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
                    {results}
                </div>
            </div>
        );
    }
}

export default SearchResult;