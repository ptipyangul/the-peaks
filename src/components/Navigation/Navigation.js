import React, { Component } from 'react';
import './Navigation.scss';
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
        if (!document.body.classList.contains("noScroll")) {
            document.body.classList.add("noScroll");
        } else {
            document.body.classList.remove("noScroll");
        }
    }

    render () {
        return (
            <Container className="NavigationContainer">
                <Row className="d-flex align-items-center">
                    <Col sm={2} className="LogoCol">
                        <div className="Logo"><a href="/"><img src={logo} alt="Diff. News Logo" /></a></div>
                    </Col>
                    <Col sm={7} className="NavCol">
                        <input type="checkbox" id="hamburgerCheckBox" className="checkBox" />
                        <label htmlFor="hamburgerCheckBox" className="checkBtn" onClick={this.handleHamburgerCheckBox}>
                            <img src={hamburgerIcon} alt="Hamburger icon" />
                        </label>
                        <Nav fill className="justify-content-center">
                            <Nav.Item><Nav.Link href="/category/sport">SPORTS</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link href="/category/world">WORLD</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link href="/category/culture">CULTURE</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link href="/category/lifestyle">LIFESTYLE</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link href="/category/technology">TECH</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link href="/category/travel">TRAVEL</Nav.Link></Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={2} className="SearchCol text-right">
                        <input
                            type="text"
                            placeholder="Search all news"
                            onKeyUp={event => this.handleSearchBoxChanged(event)}
                            maxLength="50"/>
                    </Col>
                    <Col sm={1} className="BookmarkCol text-right">
                        <a className="Bookmark" href="/bookmark"><i class="fas fa-bookmark"></i></a>
                    </Col>                    
                </Row>
            </Container>
        )
    }
}

export default Navigation;