import React from 'react';
//import * as FaIcons from 'react-icons/fa';
import { NavLink } from "react-router-dom";

const NavBar = () => {

        return (
            <nav className="nav nav-underline justify-content-between mb-2">             
                <NavLink className='nav-item nav-link link-body-emphasis' to="/">
                   Главная
                </NavLink>
                <NavLink className='nav-item nav-link link-body-emphasis' to="/flowers">
                   Список цветов
                </NavLink>               
                <NavLink className='nav-item nav-link link-body-emphasis' to="/statistics">
                    Статистика
                </NavLink>
                <NavLink className='nav-item nav-link link-body-emphasis' to="/tools">
                    Инструменты
                </NavLink>
                {/*<NavLink className='nav-item nav-link link-body-emphasis' to="/cart">*/}
                {/*    Задачи*/}
                {/*</NavLink>*/}
            </nav>
        );
}
export default NavBar;