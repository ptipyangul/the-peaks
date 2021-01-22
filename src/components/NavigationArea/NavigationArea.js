import React from 'react';
import classes from './NavigationArea.css';

const navigationArea = (props) => (
    <div className="navBar">
        <div className="Logo"><a hrelif="#">Logo</a></div>
        <div className="navRow">
            <ul>
                <li><a href="#">NEWS TODAY</a></li>
                <li><a href="#">SPORTS</a></li>
                <li><a href="#">CULTURE</a></li>
                <li><a href="#">LIFESTYLE</a></li>
            </ul>
        </div>
    </div>
)

export default navigationArea;