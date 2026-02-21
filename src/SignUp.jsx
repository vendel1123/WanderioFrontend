import { useNavigate } from 'react-router-dom';

import logo from './assets/world.png'
import './SignUp.css'

export default function SignUp(){
const navigate = useNavigate();

  const handleClick = () => {
    navigate("/")
  }
  return (
    <div className='containerSignUp'>

      <div className='signUp'>
        <div className='signUpLogo'>
          <img src={logo} alt="WanderioLogo" title='WanderioLogo' />
          <p>Wanderio</p>
        </div>

        <h2>Sign up</h2>

        <label htmlFor="username">Username</label>
        <input type="text" />

        <label htmlFor="email">Email</label>
        <input type="email" />

        <label htmlFor="password">Password</label>
        <input type="password" />

        <p>Forgot password?</p>

        <button className='signUpBtn' onClick={handleClick}>Sign up</button>

        <p>Do u have an account? <button className='signBtn' onClick={handleClick}> Sign in</button></p>
      </div>

      <div className='pictureBg'>
        <p>""Some journeys change your location; others change your soul. Travel does both.""</p>
      </div>

    </div>
  )
}