import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './NotFound.module.scss';

class NotFound extends Component {
    render () {
        return (
            <div className={classes.NotFound}>
                <div className="wrapper">
                    <h1>404 - Not Found!</h1>
                    <Link to="/">
                        Go Home
                    </Link>
                </div>
            </div>
        )
    }
}

export default NotFound