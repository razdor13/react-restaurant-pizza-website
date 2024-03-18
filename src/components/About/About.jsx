import React from 'react';
import './About.scss';
import { NavLink, Outlet } from 'react-router-dom';

const About = () => {
    return (
        <div className='container'>
            <h2>About us</h2>
            <div className='Nav'>
                <NavLink to='/about' end activeClassName='active'>
                    Story
                </NavLink>
                /
                <NavLink to='contact' activeClassName='active'>
                    Contact
                </NavLink>
            </div>
            
            <Outlet />
        </div>
    );
}

export default About;