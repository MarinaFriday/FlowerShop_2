import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar"
import Home from './components/Home/Home';
import FlowersCatalogList from './components/Flower/FlowersCatalogList';
import Statistics from './components/Statistics/Statistics';
import Tools from './components/Tools/Tools';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
   
        return (
            <div className="container">
            <NavBar />
                <div>                    
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/flowers' element={<FlowersCatalogList />} />
                        <Route path='/statistics' element={<Statistics />} />
                        <Route path='/tools' element={<Tools />} />                       
                    </Routes>                    
                </div>
            </div>
        );
}   
export default App;


