import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-route-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';

export default class App extends Component {    
    render() {

        return (
            <div>
            <Header title="Мята FlowerShop"/>
                <Router>
                    <NavBar />   
                    <Switch>
                    <Route path="/"/>
                    </Switch>
                </Router>
            <Footer />
            </div>
        );
    }   
}

