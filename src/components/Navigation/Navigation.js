import React, { Component } from 'react';
import appClasses from '../../App.module.scss';
import classes from './Navigation.module.scss';

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchKey: null
        }
    }

    handleSearchBoxChange (event) {
        this.setState({ searchKey: event.target.value });
    }

    render () {
        return (
            <div className={classes.navBar}>
                <div className={appClasses.wrapper}>
                    <div className="Logo"><a href="/">Logo</a></div>
                    <div className={classes.navRow}>
                        <ul>
                            <li><a href="/">NEWS TODAY</a></li>
                            <li><a href="/category/sport">SPORTS</a></li>
                            <li><a href="/category/culture">CULTURE</a></li>
                            <li><a href="/category/lifestyle">LIFESTYLE</a></li>
                        </ul>
                    </div>
                    <div>
                        <input type="text" placeholder="Search" onChange={this.handleSearchBoxChange} />
                    </div>
                    <br />
                </div>
            </div>
        )
    }

}

export default Navigation;