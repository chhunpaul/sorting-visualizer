import React from 'react';
import './Navigation.css';

import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className="Nav">
            <NavLink className="NavLink" to="/merge-sort">Merge Sort</NavLink>
            <NavLink className="NavLink" to="/bubble-sort">Bubble Sort</NavLink>
        </div>
    );
};

export default Navigation;