import React, { Component } from 'react';
import classes from "../NewsImageCard/NewsImageCard.css";

class NewsWithImageCard extends Component {
    render () {
        if (this.props.title) {
            let news = null;
            return (
                <div className={'newsImageCard index'+this.props.index}>
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