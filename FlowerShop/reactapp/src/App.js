import React from 'react';
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

const App = () => {
   
        return (
            <div className="container">
            <NavBar />
                <div>                    
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/flowers' element={<FlowersCatalogList />} />
                        <Route path='/bouquets' element={<BouquetsCatalogList />} />
                        <Route path='/compositions' element={<CompositionsCatalogList />} />
                        {/*<Route path='/statistics' element={<Statistics />} />*/}
                        <Route path='/tools' element={<Tools />} />  
                        <Route index path="/flowers/:id" element={<Flower />} />
                        <Route index path="/compositions/:id" element={<Composition />} />
                        <Route index path="/bouquets/:id" element={<Bouquet />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>                    
                </div>
            </div>
        );
}   
export default App;


