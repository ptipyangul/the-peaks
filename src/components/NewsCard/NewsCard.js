import React, { Component } from 'react';
import './NewsCard.scss';
import { Link } from 'react-router-dom';

import noThumbnailImg from '../../assets/no-thumb.jpg';

import { Card } from 'react-bootstrap';

class NewsCard extends Component {
    render () {
        if (this.props.title) {
            let newsImageURL = (this.props.img) ? this.props.img : noThumbnailImg;
            return (
                <Card className='newsCard'>    
                    <Link to={`/article/${this.props.newsId}`} className='newCardLink'> 
                        {this.props.showImage ? (<Card.Img variant="top" src={newsImageURL} alt={this.props.title}/>): ''}                        
                        <Card.Body className='cardBody'>
                            <Card.Title className='cardTitle'>{this.props.title}</Card.Title>     
                        </Card.Body>
                    </Link>
                </Card>
            );
        }
        return null;
    }
}

export default NewsCard;