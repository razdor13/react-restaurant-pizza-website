import React from 'react';
import './About.scss';
import { NavLink, Outlet } from 'react-router-dom';

const About = () => {
    return (
        <div className='container'>
            <h2>About us</h2>
            <div className='Nav'>
                <NavLink to={'/about'} end style={({ isActive }) => ({ color: isActive ? 'red' : 'inherit' })}>
                    Story
                </NavLink>
                /
                <NavLink to={'contact'} style={({ isActive }) => ({ color: isActive ? 'red' : 'inherit' })}>
                    Contact
                </NavLink></div>

            <Outlet />
        </div>
    );
}

export default About;