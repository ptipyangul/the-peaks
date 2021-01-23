import React, { Component } from 'react';
import axios from 'axios';

import NewsImageCard from "../NewsImageCard/NewsImageCard";

class topStories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: null,
            error: false,
            sorting: 'newest'
        }
    }

    getNews(sorting) {
        //console.log('getting news', this.state.sorting);
        axios.get('https://content.guardianapis.com/search?order-by='
            +this.state.sorting
            +'&show-fields=thumbnail%2CtrailText&page=1&page-size=8&api-key=2de4d1ab-3543-4bb4-89fa-554dbfd6f19c')
            .then(response => {
                const news = response.data.response.results;
                console.log(news);
                this.setState({news: news, error: false});
            })
            .catch(error => {
                this.setState({error: true});
            });
    }

    componentDidMount () {
        this.getNews(this.state.sorting);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.sorting !== this.props.sorting) {
            this.setState({sorting: this.props.sorting}, () => {
                this.getNews(this.state.sorting);
            })
        }
    }

    render () {
        
        let topNewsResults = <p>Loading...</p>


        if (this.state.news) {
            topNewsResults = this.state.news.map( (news, index) => {
                return <NewsImageCard 
                    key={news.id}
                    img={news.fields.thumbnail}
                    title={news.webTitle}
                    body={news.fields.trailText}
                    index={index} />
            });
        }
        return (
            <div className="topStories">
                {topNewsResults}
                {this.state.sorting}
            </div>
        )
        
    }
}

export default topStories;