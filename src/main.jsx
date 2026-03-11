import { Profiler, StrictMode } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import HomePage from './HomePage.jsx'
import Selector from './Selector.jsx';
import Profile from './Profile.jsx';
import Cart from './Cart.jsx'
import Booking from './Booking.jsx';


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignIn/>}/>
      <Route path='/signUp' element={<SignUp/>}/>
      <Route path='/homePage' element={<HomePage/>}/>
      <Route path='/selector' element={<Selector/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/booking' element={<Booking/>}/>


    </Routes>
    </BrowserRouter>,
)
