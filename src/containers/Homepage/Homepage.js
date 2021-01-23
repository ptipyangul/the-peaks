import React, { Component, createContext } from 'react';
import TopStories from '../../components/TopStories/TopStories';

class homepageArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sorting: 'newest'
        }
    }

    handleSortingChanged = (event) => {
        this.setState({ sorting: event.target.value });
    }

    render () {
        return (
            <div className="Homepage">
                <div className="wrapper">
                    <h1>Top stories</h1>
                    <select name="articles-sorting" id="articles-sorting" onChange={this.handleSortingChanged}>
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                    <TopStories sorting={this.state.sorting}/>
                </div>
            </div>
        );
    }
}

export default homepageArea;