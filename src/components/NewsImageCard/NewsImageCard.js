import React, { Component } from 'react';
import classes from "../NewsImageCard/NewsImageCard.module.scss";

class NewsWithImageCard extends Component {
    render () {
        if (this.props.title) {
            let news = null;
            let newsImageCardClassName = classes.newsImageCard + ' index' + this.props.index;
            return (
                <div className={newsImageCardClassName}>
                    <img src={this.props.img} /><br />
                    <div className="newsTitle">{this.props.title}</div>
                    <div>{this.props.body}</div>
                </div>
            );
        }
        return null;
    }
}

export default NewsWithImageCard;