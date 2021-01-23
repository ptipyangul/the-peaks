import React, { Component } from 'react';
import appClasses from '../../App.module.scss';
import classes from './Category.module.scss';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryName: this.capitalize(this.props.match.params.categoryName)
        }
    }

    capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    render () {
        return (
            <div className={appClasses.wrapper}>
                <div className="">
                    <h1>{this.state.categoryName}</h1>
                </div>
            </div>
        )
    }
}

export default Category;