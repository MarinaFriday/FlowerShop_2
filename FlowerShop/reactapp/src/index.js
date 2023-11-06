import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
//import NavBar from "./components/NavBar/NavBar";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Header title="Мята FlowerShop" />                       
            <App />                     
        </BrowserRouter>
        <Footer />                
  </React.StrictMode>
);


reportWebVitals();
