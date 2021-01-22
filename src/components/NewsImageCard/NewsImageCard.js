import React, { Component } from 'react';

class NewsWithImageCard extends Component {
    render () {
        if (this.props.id) {
            let news = null;
            return (
                <div key={this.props.id} className={'newsIndex'+this.props.index}>
                    <img src={this.props.img} />
                    <span>{this.props.title}</span>
                    <span>{this.props.body}</span>
                </div>
            );
        }
        return null;
    }
}

export default NewsWithImageCard;