import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { CartProvider } from './context/CartContext';
import { OrderItemProvider } from './context/OrderItemContext';


import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Register/Signup';
import Profile from './pages/Profile/Profile';
import Checkout from './pages/Checkout/Checkout';
import Cart from './pages/Cart/Cart';
import Navbar from './components/Navbar/Navbar';
import Product from './pages/Product/ProductView';
import Order from './pages/Order/Order';
import DeveloperInfo from './components/DeveloperInfo';
import Documentation from './pages/Documentation';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CartProvider>
          <OrderItemProvider>
            <Navbar/>
            <Routes>
              <Route Component={Home} path='/' />
              <Route Component={Product} path='/product/:id/'/>
              <Route Component={Order} path='/order/'/>
              <Route Component={Login} path='/login/' />
              <Route Component={Signup} path='/signup/' />
              <Route Component={Profile} path='/profile/:username/' />
              <Route Component={Checkout} path='/checkout/'/>
              <Route Component={Cart} path='/cart/'/>
              <Route Component={Documentation} path='/documentation'/>
            </Routes>
            <DeveloperInfo/>
          </OrderItemProvider>
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
