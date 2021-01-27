import React, { Component } from 'react';
import classes from "../NewsCard/NewsCard.module.scss";
import { Link } from 'react-router-dom';

import noThumbnailImg from '../../assets/no-thumb.jpg';

class NewsCard extends Component {
    render () {
        if (this.props.title) {
            let news = null;
            let newsImageCardClassName = classes.newsCard + ' index' + this.props.index;
            let newsImageURL = (this.props.img) ? this.props.img : noThumbnailImg;
            return (
                <Link to={`/article/${this.props.newsId}`} className={this.props.linkClassName}>
                    <div className={newsImageCardClassName} style={{ backgroundImage: `url(${newsImageURL})` }}>
                        <div className={classes.inner}>
                            <div className={classes.newsTitle}>{this.props.title}</div>
                            {/* <img src={this.props.img} /><br /> */}
                            {/* <div className={classes.newsTitle}>{this.props.title}</div>
                            <div dangerouslySetInnerHTML={{__html: this.props.body}} /> */}
                        </div>
                    </div>
                </Link>
            );
        }
        return null;
    }
}

export default NewsCard;