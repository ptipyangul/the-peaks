import React from 'react';
import appClasses from '../../App.module.scss';
import classes from './NavigationArea.module.scss';

const navigationArea = (props) => (
    <div className={classes.navBar}>
        <div className={appClasses.wrapper}>
            <div className="Logo"><a href="/">Logo</a></div>
            <div className={classes.navRow}>
                <ul>
                    <li><a href="/">NEWS TODAY</a></li>
                    <li><a href="/category/sport">SPORTS</a></li>
                    <li><a href="/category/culture">CULTURE</a></li>
                    <li><a href="/category/lifeandstyle">LIFESTYLE</a></li>
                </ul>
            </div>
        </div>
    </div>
)

export default navigationArea;