import React, { Component } from 'react';
import classes from './Homepage.css';

import TopStories from '../../components/HomepageComponents/TopStories/TopStories';
import CategoryBasedSections from '../../components/HomepageComponents/CategoyBased/CategoryBased';

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
                    <div className="homepageSections">
                        <h2>Top stories</h2>
                        <select name="articles-sorting" id="articles-sorting" onChange={this.handleSortingChanged}>
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                        {/*<TopStories sorting={this.state.sorting}/>*/}
                    </div>
                    <div className="homepageSections">
                        <h2>Sports</h2>
                        <CategoryBasedSections />
                    </div>
                </div>
            </div>
        );
    }
}

export default homepageArea;