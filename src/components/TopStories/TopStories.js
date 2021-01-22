import React, { Component } from 'react';
//import classes from './TopStories.css';

import NewsImageCard from "../NewsImageCard/NewsImageCard";

import axios from 'axios';

class topStories extends Component {

    state = {
        news: null,
        error: false
    }

    componentDidMount () {
        axios.get('https://content.guardianapis.com/search?order-by=newest&show-fields=thumbnail%2CtrailText&page=1&page-size=8&api-key=2de4d1ab-3543-4bb4-89fa-554dbfd6f19c')
            .then(response => {
                const news = response.data.response.results;
                this.setState({news: news, error: false});
            })
            .catch(error => {
                this.setState({error: true});
            });
    }
    
    render () {
        

        let topNewsResults = <p>Loading...</p>

        if (this.state.news) {
            topNewsResults = this.state.news.map( (news, index) => {
                return <NewsImageCard 
                    id={news.id}
                    img={news.fields.thumbnail}
                    title={news.webTitle}
                    body={news.fields.trailText}
                    index={index} />
            });
        }
        return (
            <div className="topStories">{topNewsResults}</div>
        )
        
    }
}

export default topStories;