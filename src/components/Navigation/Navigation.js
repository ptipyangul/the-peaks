import React, { Component } from 'react';
import './Navigation.scss';
import logo from '../../assets/logo.png';
import {DebounceInput} from 'react-debounce-input';

import { Container, Row, Col, Nav, Accordion, Button } from 'react-bootstrap';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prevPage: null,
            redirectedToSearch: false,
            isHamburgerOpen: false
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

    render () {
        return (
            <Container className="NavigationContainer">
                <div className="NavLargerScreen d-none d-lg-block">
                    <Row className="d-flex align-items-center">
                        <Col sm={2} className="LogoCol">
                            <div className="Logo"><a href="/"><img src={logo} alt="Diff. News Logo" /></a></div>
                        </Col>
                        <Col sm={7} className="NavCol">
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
                            <DebounceInput
                                placeholder="Search..."
                                maxLength="50"
                                minLength={2}
                                debounceTimeout={300}
                                onChange={event => this.handleSearchBoxChanged(event)} />
                        </Col>
                        <Col sm={1} className="BookmarkCol text-right">
                            <a className="Bookmark" href="/bookmark"><i class="fas fa-bookmark"></i></a>
                        </Col>                    
                    </Row>
                </div>
                {/* Smaller nav */}
                <div className="NavSmallScreen d-block d-lg-none d-xl-none d-xxl-none">
                    <Accordion>
                        <Row className="d-flex align-items-center">
                            <Col xs={3} className="hamburburMenu">
                                <Accordion.Toggle as={Button} variant="primary" size="sm" eventKey="0">
                                    <i class="fas fa-bars"></i>
                                </Accordion.Toggle>
                            </Col>
                            <Col xs={6} className="LogoCol text-center">
                                <div className="Logo"><a href="/"><img src={logo} alt="Diff. News Logo" /></a></div>
                            </Col> 
                            <Col xs={3} className="SearchCol text-right">
                                <Accordion.Toggle as={Button} variant="outline-primary" size="sm" eventKey="1">
                                    <i class="fas fa-search"></i>
                                </Accordion.Toggle>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Accordion.Collapse eventKey="0">
                                    <Nav className="flex-column">
                                        <Nav.Item><Nav.Link href="/">HOME</Nav.Link></Nav.Item>
                                        <Nav.Item><Nav.Link href="/category/sport">SPORTS</Nav.Link></Nav.Item>
                                        <Nav.Item><Nav.Link href="/category/world">WORLD</Nav.Link></Nav.Item>
                                        <Nav.Item><Nav.Link href="/category/culture">CULTURE</Nav.Link></Nav.Item>
                                        <Nav.Item><Nav.Link href="/category/lifestyle">LIFESTYLE</Nav.Link></Nav.Item>
                                        <Nav.Item><Nav.Link href="/category/technology">TECH</Nav.Link></Nav.Item>
                                        <Nav.Item><Nav.Link href="/category/travel">TRAVEL</Nav.Link></Nav.Item>
                                        <Nav.Item><Nav.Link href="/bookmark">My Bookmark</Nav.Link></Nav.Item>
                                    </Nav>
                                </Accordion.Collapse>
                                <Accordion.Collapse eventKey="1">
                                    <DebounceInput
                                        placeholder="Search..."
                                        maxLength="50"
                                        minLength={2}
                                        debounceTimeout={300}
                                        onChange={event => this.handleSearchBoxChanged(event)} />
                                </Accordion.Collapse> 
                            </Col>
                        </Row>
                    </Accordion>  
                </div>
            </Container>
        )
    }
}

export default Navigation;