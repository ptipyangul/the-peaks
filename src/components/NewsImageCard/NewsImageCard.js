import React, { Component } from 'react';
import classes from "../NewsImageCard/NewsImageCard.module.scss";
import { Link } from 'react-router-dom';

class NewsWithImageCard extends Component {
    render () {
        if (this.props.title) {
            let news = null;
            let newsImageCardClassName = classes.newsImageCard + ' index' + this.props.index;
            return (
                <Link to={`/article/${this.props.newsId}`}>
                    <div className={newsImageCardClassName}>
                        <img src={this.props.img} /><br />
                        <div className="newsTitle">{this.props.title}</div>
                        <div>{this.props.body}</div>
                    </div>
                </Link>
            );
        }
        return null;
    }
}

export default NewsWithImageCard;