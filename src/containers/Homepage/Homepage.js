import React, { Component } from 'react';
import classes from './Homepage.module.scss';

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
            <div className={classes.homepage}>
                <div className="wrapper">
                    <div className={classes.homepageSections}>
                        <h2>Top stories</h2>
                        <select name="articles-sorting" id="articles-sorting" onChange={this.handleSortingChanged}>
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                        {/*<TopStories sorting={this.state.sorting}/>*/}
                    </div>
                    <div className={classes.homepageSections}>
                        <h2>Sports</h2>
                        <a href="/category/sport">See all</a>
                        <CategoryBasedSections sectionName="sport" />
                    </div>
                    <div className={classes.homepageSections}>
                        <h2>Culture</h2>
                        <a href="/category/culture">See all</a>
                        <CategoryBasedSections sectionName="culture" />
                    </div>
                    <div className={classes.homepageSections}>
                        <h2>Lifestyle</h2>
                        <a href="/category/lifeandstyle">See all</a>
                        <CategoryBasedSections sectionName="lifeandstyle" />
                    </div>
                </div>
            </div>
        );
    }
}

export default homepageArea;