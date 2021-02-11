import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.scss';
import TopStories from '../../components/HomepageComponents/TopStories/TopStories';
import CategoryBasedSections from '../../components/HomepageComponents/CategoyBased/CategoryBased';

import { Container, Row, Col, Button } from 'react-bootstrap';

class homepageArea extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    handleSortingChanged = (event) => {
        this.setState({ sorting: event.target.value });
    }

    render () {
        return (
            <div className="HomepagePage">
                <Container>
                    <div className="topSection">
                        <TopStories />
                    </div>
                    <div className="homepageSections">
                        <Row className="categoryBaseHeader">
                            <Col sm={10}><h2>Sports</h2></Col>
                            <Col sm={2} className="text-right"><Button variant="outline-primary" size="sm" href="/category/sport">See all</Button></Col>
                        </Row>
                        <Row className="categoryBaseItems">
                            <Col sm={12}>
                                <CategoryBasedSections sectionName="sport" />
                            </Col>                            
                        </Row>
                    </div>
                    <div className="homepageSections">
                        <Row className="categoryBaseHeader">
                            <Col sm={10}><h2>Culture</h2></Col>
                            <Col sm={2} className="text-right"><Button variant="outline-primary" size="sm" href="/category/culture">See all</Button></Col>
                        </Row>
                        <Row className="categoryBaseItems">
                            <Col sm={12}>
                                <CategoryBasedSections sectionName="culture" />
                            </Col>                            
                        </Row>
                    </div>
                    <div className="homepageSections">
                        <Row className="categoryBaseHeader">
                            <Col sm={10}><h2>Lifestyle</h2></Col>
                            <Col sm={2} className="text-right"><Button variant="outline-primary" size="sm" href="/category/lifestyle">See all</Button></Col>
                        </Row>
                        <Row className="categoryBaseItems">
                            <Col sm={12}>
                                <CategoryBasedSections sectionName="lifeandstyle" />
                            </Col>                            
                        </Row>
                    </div>
                </Container>
            </div>
        );
    }
}

export default homepageArea;