import React, { Component } from 'react';
import appClasses from '../../App.module.scss';
import classes from './Homepage.module.scss';
import TopStories from '../../components/HomepageComponents/TopStories/TopStories';
import CategoryBasedSections from '../../components/HomepageComponents/CategoyBased/CategoryBased';
import NewsSorting from '../../components/NewsSorting/NewsSorting';

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
                <div className={appClasses.wrapper}>
                    <div className={classes.homepageSections}>
                        <h2>Top stories</h2>
                        <NewsSorting changed={this.handleSortingChanged}/>
                        {/*<TopStories sorting={this.state.sorting}/>*/}
                    </div>
                    <div className={classes.homepageSections}>
                        <h2>Sports</h2>
                        <div className={classes.seeAll}>
                            <a href="/category/sport">See all</a>
                        </div>
                        {/* <CategoryBasedSections sectionName="sport" /> */}
                    </div>
                    <div className={classes.homepageSections}>
                        <h2>Culture</h2>
                        <div className={classes.seeAll}>
                            <a href="/category/culture">See all</a>
                        </div>
                        {/* <CategoryBasedSections sectionName="culture" /> */}
                    </div>
                    <div className={classes.homepageSections}>
                        <h2>Lifestyle</h2>
                        <div className={classes.seeAll}>
                            <a href="/category/lifeandstyle">See all</a>
                        </div>
                        {/* <CategoryBasedSections sectionName="lifeandstyle" /> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default homepageArea;