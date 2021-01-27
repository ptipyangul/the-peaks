import React, { Component } from 'react';
import classes from './Navigation.module.scss';
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

    handleHamburgerCheckBox = () => {
        if (!document.body.classList.contains(`${classes.noScroll}`)) {
            document.body.classList.add(`${classes.noScroll}`);
        } else {
            document.body.classList.remove(`${classes.noScroll}`);
        }
    }
    render () {
        return (
            <div className={classes.NavBar}>
                <div className="wrapper">
                    <div className={classes.navBarContainer}>
                        <div className={classes.Logo}><a href="/"><img src={logo} /></a></div>
                        <div className={classes.Nav}>
                            <nav>
                                <input type="checkbox" id="hamburgerCheckBox" className={classes.checkBox} />
                                <label htmlFor="hamburgerCheckBox" className={classes.checkBtn} onClick={this.handleHamburgerCheckBox}>
                                    <img src={hamburgerIcon} />
                                </label>
                                <ul>
                                    <li className={classes.news}><a href="/">NEWS TODAY</a></li>
                                    <li className={classes.sport}><a href="/category/sport">SPORTS</a></li>
                                    <li className={classes.culture}><a href="/category/culture">CULTURE</a></li>
                                    <li className={classes.lifestyle}><a href="/category/lifestyle">LIFESTYLE</a></li>
                                </ul>
                            </nav>
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