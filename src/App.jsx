import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import logo from './assets/world.png'

import './App.css'

function App() {
 const navigate = useNavigate();

  const handleClick = () => {
    navigate("/SignUp");
  };
  return (
    <div className='containerLogin'>

      <div className='signIn'>
        <div className='signInLogo'>
          <img src={logo} alt="WanderioLogo" title='WanderioLogo' />
          <p>Wanderio</p>
        </div>

        <h2>Sign in</h2>

        <label htmlFor="username">Username</label>
        <input type="text" />

        <label htmlFor="password">Password</label>
        <input type="password" />

        <p>Forgot password?</p>

        <button className='signInBtn' onClick={()=>navigate("/HomePage")}>Sign in</button>
        <button className='signInBtn'>Admin</button>

        <p>Don't have an account? <button className='signBtn' onClick={handleClick}>Sign up</button></p>
      </div>

      <div className='pictureBg'  >
        <p>"Traveling opens your mind, connects you with new cultures, and fills life with unforgettable experiences."</p>
      </div>

    </div>
  )
}

export default App
