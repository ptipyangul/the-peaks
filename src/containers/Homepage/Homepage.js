import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
                <div className="wrapper">
                    <div className={classes.homepageSections}>
                        <div className={classes.topStoriesHeader}>
                            <h1 className={classes.heading}>Top stories</h1>
                            <div className={classes.bookmarkCol}>
                               <Link to="/bookmark"><div className="bookmarkBtn topStories">VIEW BOOKMARK</div></Link>
                            </div>
                            <div className={classes.topStoriesSorting}><NewsSorting changed={this.handleSortingChanged}/></div>
                        </div>
                        <TopStories sorting={this.state.sorting}/>
                    </div>
                    <div className={classes.homepageSections}>
                        <div className={classes.categoryBaseHeader}>
                            <h2>Sports</h2>
                            <div className={classes.categorySeeAllCol}>
                                <a href="/category/sport">See all</a>
                            </div>
                        </div>
                        <CategoryBasedSections sectionName="sport" />
                    </div>
                    <div className={classes.homepageSections}>
                        <div className={classes.categoryBaseHeader}>
                            <h2>Culture</h2>
                            <div className={classes.categorySeeAllCol}>
                                <a href="/category/culture">See all</a>
                            </div>
                        </div>
                        <CategoryBasedSections sectionName="culture" />
                    </div>
                    <div className={classes.homepageSections}>
                        <div className={classes.categoryBaseHeader}>
                            <h2>Lifestyle</h2>
                            <div className={classes.categorySeeAllCol}>
                                <a href="/category/lifestyle">See all</a>
                            </div>
                        </div>
                        <CategoryBasedSections sectionName="lifeandstyle" />
                    </div>
                </div>
            </div>
        );
    }
}

export default homepageArea;