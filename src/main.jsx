
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from './Auth/SignIn.jsx';
import SignUp from './Auth/SignUp.jsx';
import HomePage from './Home/HomePage.jsx'
import Selector from './Selector/Selector.jsx';
import Profile from './Profile/Profile.jsx';
import Cart from './Cart/Cart.jsx'
import Booking from './Booking/Booking.jsx';
import Flights from './Flights/Flights.jsx';



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
      <Route path='/flights' element={<Flights/>}/>


    </Routes>
    </BrowserRouter>,
)
