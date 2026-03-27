
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from 'react';
import { AuthProvider } from './context/AuthContext';

import SignIn from './Auth/SignIn.jsx';
import SignUp from './Auth/SignUp.jsx';
import HomePage from './Home/HomePage.jsx'
import Selector from './Selector/Selector.jsx';
import Profile from './Profile/Profile.jsx';
import Cart from './Cart/Cart.jsx'
import Booking from './Booking/Booking.jsx';
import Flights from './Flights/Flights.jsx';
import Hotels from './Hotels/Hotels.jsx'
import HotelBook from './Hotels/HotelBook.jsx';
import Admin from './Admin/Admin.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/homePage' element={<HomePage />} />
          <Route path='/selector' element={<Selector />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/booking' element={<Booking />} />
          <Route path='/flights' element={<Flights />} />
          <Route path='/hotels' element={<Hotels />} />
          <Route path='/hotelBook' element={<HotelBook />} />
          <Route path='/admin' element={<Admin />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
