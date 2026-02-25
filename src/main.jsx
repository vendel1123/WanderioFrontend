import { StrictMode } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.jsx'
import SignUp from './SignUp.jsx';
import HomePage from './HomePage.jsx'
import Selector from './Selector.jsx';


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/signUp' element={<SignUp/>}/>
      <Route path='/homePage' element={<HomePage/>}/>
      <Route path='/selector' element={<Selector/>}/>
    </Routes>
    </BrowserRouter>,
)
