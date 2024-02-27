import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar"
import Home from './components/Home/Home';
import Flower from './components/Flower/Flower'
import Composition from './components/Composition/Composition'
import NotFound from './components/NotFound/NotFound';
import FlowersCatalogList from './components/Flower/FlowersCatalogList';
import BouquetsCatalogList from './components/Bouquet/BouquetsCatalogList';
import CompositionsCatalogList from './components/Composition/CompositionsCatalogList';
import Bouquet from './components/Bouquet/Bouquet';
import Tools from './components/Tools/Tools';
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from './components/Auth/Auth';
import Cookies from 'universal-cookie';


const App = () => {
    const cookies = new Cookies();
    const [role, setRole] = useState(undefined);

    useEffect(() => { setRole(cookies.get('userRole')) }, []);
    console.log(role)
    if ((cookies.get('userRole') === undefined) && (window.location.href !== 'http://localhost:3000/' && window.location.href !== 'http://localhost:3000/auth')) {
        window.location.replace('http://localhost:3000')
    }
    


        return (
            <div className="container">
            <NavBar />
                <div>                    
                    <Routes>
                        <Route path='/' element={<Home />} />                        
                        <Route index path="/auth" element={<Auth />} />
                        <Route path='*' element={<NotFound />} />
                        {(role !== undefined) ? (
                            <>
                        <Route path='/flowers' element={<FlowersCatalogList />} />
                        <Route path='/bouquets' element={<BouquetsCatalogList />} />
                        <Route path='/compositions' element={<CompositionsCatalogList />} />
                        <Route path='/tools' element={<Tools />} />
                        <Route index path="/flowers/:id" element={<Flower />} />
                        <Route index path="/compositions/:id" element={<Composition />} />
                        <Route index path="/bouquets/:id" element={<Bouquet />} />
                            </>
                        ) : null}
                    </Routes>                    
                </div>
            </div>
        );
}   
export default App;


