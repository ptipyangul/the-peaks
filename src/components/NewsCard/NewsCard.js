import React, { Component } from 'react';
import classes from "../NewsCard/NewsCard.module.scss";
import { Link } from 'react-router-dom';

import noThumbnailImg from '../../assets/no-thumb.jpg';

import { Card } from 'react-bootstrap';

class NewsCard extends Component {
    render () {
        if (this.props.title) {
            let newsImageURL = (this.props.img) ? this.props.img : noThumbnailImg;
            return (
                <Card className={classes.newsCard}>     
                    <Link to={`/article/${this.props.newsId}`} className={classes.newCardLink}> 
                        {this.props.showImage ? (<Card.Img variant="top" src={newsImageURL} alt={this.props.title}/>): ''}                        
                        <Card.Body className={classes.cardBody}>
                            <Card.Title className={classes.cardTitle}>{this.props.title}</Card.Title>     
                        </Card.Body>
                    </Link>
                </Card>
            );
        }
        return null;
    }
}

export default NewsCard;