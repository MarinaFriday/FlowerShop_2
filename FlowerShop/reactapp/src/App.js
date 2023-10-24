﻿import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Flowers from './components/Flower/Flowers';
import Statistics from './components/Statistics/Statistics';
import Tools from './components/Tools/Tools';


export default class App extends Component {    
    render() {

        return (
            <div className="container">
                <div>
                    <NavBar />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/flowers' element={<Flowers />} />
                        <Route path='/statistics' element={<Statistics />} />
                        <Route path='/tools' element={<Tools />} />
                    </Routes>
                </div>
            </div>
        );
    }   
}

