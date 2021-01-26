import React, { Component } from 'react';
import classes from './Navigation.module.scss';
import layoutStyle from '../../layout.scss';

import logo from '../../assets/logo.png';
import hamburgerIcon from '../../assets/hamburger.png';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectedToSearch: false
        }
    }

    handleSearchBoxChanged (event) {
        this.setState({ searchKey: event.target.value });
    }

    componentDidUpdate() {
        /*if (!this.state.redirectedToSearch) {
            this.setState({ redirectedToSearch: true });
            this.props.history.push('/search');
        }*/
    }
    render () {
        return (
            <div className={classes.NavBar}>
                <div className="wrapper">
                    <div className={classes.navBarContainer}>
                        <input type="checkbox" id="check" />
                        <label for="check" className="checkbtn">
                            <i class="fas fa-bars"></i>
                        </label>
                        <div className={classes.Logo}><a href="/"><img src={logo} /></a></div>
                        <div className={classes.Nav}>
                            <ul>
                                <li className={classes.news}><a href="/">NEWS TODAY</a></li>
                                <li className={classes.sport}><a href="/category/sport">SPORTS</a></li>
                                <li className={classes.culture}><a href="/category/culture">CULTURE</a></li>
                                <li className={classes.lifestyle}><a href="/category/lifestyle">LIFESTYLE</a></li>
                            </ul>
                        </div>
                        <div className={classes.Search}>
                            <input
                                type="text"
                                placeholder="Search all news"
                                onKeyUp={event => this.handleSearchBoxChanged(event)}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navigation;