// I want to build a Home.jsx component that will be the home page of my app
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Home = () => {
    
    return (
        <div className="container">
        <div className="py-4">
            <h1>Home Page</h1>
            
            <Link className="btn btn-primary mr-2" to="/usuarios">
                Usuarios
            </Link>
        </div>
        </div>
    );
    }

export default Home;

