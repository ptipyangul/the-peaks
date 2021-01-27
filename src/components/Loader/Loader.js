import React, { Component } from 'react';
import classes from './Loader.module.scss';

class Loader extends Component {

    state = { isLoading: false };

    componentDidUpdate(prevProps) {
        if ( prevProps.isLoading !== this.props.isLoading ) {
            this.setState({ isLoading: this.props.isLoading });
        }
    }

    render () {
        let Loader = (this.state.isLoading) ? <div className={classes.Loader}></div> : <div className={`${classes.Loader} ${classes.Hide}`}></div>;
        return(
            <div className={classes.LoaderContainer}>{Loader}</div>
        );
    }
}

export default Loader;