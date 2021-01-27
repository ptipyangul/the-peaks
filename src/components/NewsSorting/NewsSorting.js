import React, { Component } from 'react';
import classes from '../NewsSorting/NewsSorting.module.scss';

class NewsSorting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sorting: 'newest'
        }
    }

    render () {
        return (
            <select name="articles-sorting" id="articles-sorting" onChange={this.props.changed} className={classes.sortingSelect}>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
            </select>  
        )
    }
}

export default NewsSorting;