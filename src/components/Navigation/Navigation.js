import React, { Component } from 'react';
import classes from './Navigation.module.scss';
import logo from '../../assets/logo.png';
import hamburgerIcon from '../../assets/hamburger.png';

import { Container, Row, Col, Nav } from 'react-bootstrap';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prevPage: null,
            redirectedToSearch: false
        }
    }

    handleSearchBoxChanged (event) {
        if (  event.target.value.length >=  0 ) {
            this.props.updateSearchKey(event.target.value);
            this.setState({ 
                prevPage: this.props.location.pathname,
                searchKey: encodeURIComponent(event.target.value)
                }, () => {
                    this.props.history.push('/search');
            });
        }
    }

    componentDidUpdate() {
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
            <Container>
                <Row>
                    <Col sm={2} className={classes.LogoCol} >
                        <div className={classes.Logo}><a href="/"><img src={logo} alt="Diff. News Logo" /></a></div>
                    </Col>
                    <Col sm={7} className={classes.NavCol}>
                        <input type="checkbox" id="hamburgerCheckBox" className={classes.checkBox} />
                        <label htmlFor="hamburgerCheckBox" className={classes.checkBtn} onClick={this.handleHamburgerCheckBox}>
                            <img src={hamburgerIcon} alt="Hamburger icon" />
                        </label>
                        <Nav fill className="justify-content-center">
                            <Nav.Item><Nav.Link href="/category/sport">SPORTS</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link href="/category/culture">CULTURE</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link href="/category/lifestyle">LIFESTYLE</Nav.Link></Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={2} className={`${classes.SearchCol} text-right`}>
                        <input
                            type="text"
                            placeholder="Search all news"
                            onKeyUp={event => this.handleSearchBoxChanged(event)}
                            maxLength="50"/>
                    </Col>
                    <Col sm={1} className={`${classes.BookmarkCol} text-right`}>
                        <a className={classes.Bookmark} href="/bookmark"><i class="fas fa-bookmark"></i></a>
                    </Col>                    
                </Row>

            </Container>
        )
    }
}

export default Navigation;