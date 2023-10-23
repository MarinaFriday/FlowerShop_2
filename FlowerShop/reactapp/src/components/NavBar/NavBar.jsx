import React from 'react';
import * as FaIcons from 'react-icons/fa';
import { NavLink, Link } from "react-router-dom";

export default class NavBar extends React.Component {

    render() { 
        return (
            <nav className="nav nav-underline justify-content-between mb-2">
                <Link to='#' className='menu-bars'>
                    <FaIcons.FaBars/>
                </Link>

                {/*<NavLink className='nav-item nav-link link-body-emphasis' to="/">*/}
                {/*    �������*/}
                {/*</NavLink>*/}
                {/*<NavLink className='nav-item nav-link link-body-emphasis' to="/flowers">*/}
                {/*    ������� ������*/}
                {/*</NavLink>               */}
                {/*<NavLink className='nav-item nav-link link-body-emphasis' to="/cart">*/}
                {/*    ����������*/}
                {/*</NavLink>*/}
                {/*<NavLink className='nav-item nav-link link-body-emphasis' to="/cart">*/}
                {/*    �����������*/}
                {/*</NavLink>*/}
                {/*<NavLink className='nav-item nav-link link-body-emphasis' to="/cart">*/}
                {/*    ������*/}
                {/*</NavLink>*/}
            </nav>
        );
    }
}