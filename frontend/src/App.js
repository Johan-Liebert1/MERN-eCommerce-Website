import React from 'react';
import './App.css';
import { Container } from "react-bootstrap";

import Header from './components/Header'
import Footer from './components/Footer'

function App() {
    return (
        <>
            <Header />
            <main className='py-3'>
                <Container>
                    <h1>Yo</h1>
                </Container>
            </main>
            <Footer />
        </>
    );
}

export default App;
