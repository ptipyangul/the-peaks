import React from 'react';
import appClasses from '../../App.module.scss';
import classes from './Navigation.module.scss';

const Navigation = (props) => (
    <div className={classes.navBar}>
        <div className={appClasses.wrapper}>
            <div className="Logo"><a href="/">Logo</a></div>
            <div className={classes.navRow}>
                <ul>
                    <li><a href="/">NEWS TODAY</a></li>
                    <li><a href="/category/sport">SPORTS</a></li>
                    <li><a href="/category/culture">CULTURE</a></li>
                    <li><a href="/category/lifestyle">LIFESTYLE</a></li>
                </ul>
            </div>
        </div>
    </div>
)

export default Navigation;