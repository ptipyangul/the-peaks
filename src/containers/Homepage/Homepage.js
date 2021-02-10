import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './Homepage.module.scss';
import TopStories from '../../components/HomepageComponents/TopStories/TopStories';
import CategoryBasedSections from '../../components/HomepageComponents/CategoyBased/CategoryBased';

import { Container, Row, Col, Button } from 'react-bootstrap';

class homepageArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sorting: 'newest'
        }
    }

    handleSortingChanged = (event) => {
        this.setState({ sorting: event.target.value });
    }

    render () {
        return (
            <div className={classes.homepage}>
                <Container>
                    <Row className={classes.homepageSections}>
                        <TopStories />
                    </Row>
                    <Row className={classes.homepageSections}>
                        <Row className={classes.categoryBaseHeader}>
                            <Col><h2>Sports</h2></Col>
                            <Col className={classes.categorySeeAllCol}>
                                <Button variant="outline-primary" size="sm" href="/category/sport">See all</Button>
                            </Col>
                        </Row>
                        <Row>
                            <CategoryBasedSections sectionName="sport" />
                        </Row>
                    </Row>
                    <Row className={classes.homepageSections}>
                        <Row className={classes.categoryBaseHeader}>
                            <Col><h2>Culture</h2></Col>
                            <Col className={classes.categorySeeAllCol}>
                                <Button variant="outline-primary" size="sm" href="/category/culture">See all</Button>
                            </Col>
                        </Row>
                        <Row>
                            <CategoryBasedSections sectionName="culture" />
                        </Row>
                    </Row>
                    <Row className={classes.homepageSections}>
                        <Row className={classes.categoryBaseHeader}>
                            <h2>Lifestyle</h2>
                            <Col className={classes.categorySeeAllCol}>
                                <Button variant="outline-primary" size="sm" href="/category/lifestyle">See all</Button>
                            </Col>
                        </Row>
                        <Row>
                            <CategoryBasedSections sectionName="lifeandstyle" />
                        </Row>                        
                    </Row>
                </Container>
            </div>
        );
    }
}

export default homepageArea;