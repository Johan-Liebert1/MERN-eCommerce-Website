import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import { Container } from "react-bootstrap";

import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <main className='py-3'>
                <Container>
                    <Route exact path = '/' render = {() => <HomeScreen />} />

                    <Route 
                        exact path = '/product/:id' 
                        render = {routeProps => <ProductScreen {...routeProps}/>} 
                    />

                    {/* the ? after :id means the id parameter is optional */}
                    <Route 
                        exact path = '/cart/:id?' 
                        render = {routeProps => <CartScreen {...routeProps} /> } 
                    />

                    <Route 
                        exact path = '/login' 
                        render = {routeProps => <LoginScreen {...routeProps} /> } 
                    />

                    <Route 
                        exact path = '/register' 
                        render = {routeProps => <RegisterScreen {...routeProps} /> } 
                    />

                    <Route 
                        exact path = '/profile' 
                        render = {routeProps => <ProfileScreen {...routeProps} /> } 
                    />
                    
                </Container>
            </main>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
