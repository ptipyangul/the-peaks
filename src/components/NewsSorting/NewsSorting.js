import React, { Component } from 'react';
import classes from '../NewsSorting/NewsSorting.module.scss';

import { Form } from 'react-bootstrap';

class NewsSorting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sorting: 'newest'
        }
    }

    render () {
        return (
            <Form>
            <Form.Group>
                <Form.Control as="select" custom name="articles-sorting" onChange={this.props.changed} size="sm">
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                </Form.Control>
            </Form.Group>
            </Form>
        )
    }
}

export default NewsSorting;