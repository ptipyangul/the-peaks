import React, { Component } from 'react';
import classes from "../NewsCard/NewsCard.module.scss";
import { Link } from 'react-router-dom';

import noThumbnailImg from '../../assets/no-thumb.jpg';

class NewsCard extends Component {
    render () {
        if (this.props.title) {
            let newsImageCardClassName = classes.newsCard + ' index' + this.props.index;
            let newsImageURL = (this.props.img) ? this.props.img : noThumbnailImg;
            let trailText = (this.props.index === 0) ? this.props.trailText : null;
            return (
                <Link to={`/article/${this.props.newsId}`} className={this.props.linkClassName}>
                    <div className={newsImageCardClassName} style={{ backgroundImage: `url(${newsImageURL})` }}>
                        <div className={classes.inner}>
                            <div className={classes.newsTitle}>
                                <p>{this.props.title}</p>
                                <div className={classes.trailText}>{trailText}</div>
                            </div>
                        </div>
                    </div>
                </Link>
            );
        }
        return null;
    }
}

export default NewsCard;