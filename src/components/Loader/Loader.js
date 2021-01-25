import React, { Component } from 'react';
import classes from './Loader.module.scss';

class Loader extends Component {

    state = { isLoading: false };

    componentDidUpdate(prevProps) {
        if ( prevProps.isLoading != this.props.isLoading ) {
            this.setState({ isLoading: this.props.isLoading });
        }
    }

    render () {
        let Loader = '';
        if (this.state.isLoading) {
            Loader = <div className={classes.Loader}></div>;
        }
        return(
            <div>{Loader}</div>
        );
    }
}

export default Loader;