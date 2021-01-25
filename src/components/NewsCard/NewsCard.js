import React, { Component } from 'react';
import classes from "../NewsCard/NewsCard.module.scss";
import { Link } from 'react-router-dom';

class NewsCard extends Component {
    render () {
        if (this.props.title) {
            let news = null;
            let newsImageCardClassName = classes.newsCard + ' index' + this.props.index;
            return (
                <Link className={classes.newCardLink} to={`/article/${this.props.newsId}`}>
                    <div className={newsImageCardClassName}>
                        <img src={this.props.img} /><br />
                        <div className={classes.newsTitle}>{this.props.title}</div>
                        <div dangerouslySetInnerHTML={{__html: this.props.body}} />
                    </div>
                </Link>
            );
        }
        return null;
    }
}

export default NewsCard;