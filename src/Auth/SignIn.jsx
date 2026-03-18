
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import logo from '../assets/world.png'
import { login, whoami } from '../user.js'

import InputMezo from '../components/InputMezo'

import './SignIn.css'

function SignIn({}) {
  const navigate = useNavigate();

  const [hiba, setHiba] = useState('')
  const [uzenet, setUzenet] = useState('')

  const [email, setEmail] = useState('')
  const [psw, setPsw] = useState('')

  const [user,setUser] = useState(null)

  async function onLogin() {
    setHiba('')
    setUzenet('')
    if (!email || !psw) {
      return setHiba('Minden mezot tolts ki')
    }

    try {
      const data = await login(email, psw)
      if (data.error) {
        setHiba(data.error)
        return 
      }
      setUzenet(data.message)
      setTimeout(() => navigate('/homePage'), 600)

    } catch (err) {
      setHiba('Nem sikerult bejelentkezni')
    }

  }
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

        {hiba && <div className='alert alert-danger'>{hiba}</div>}
        {uzenet && <div className='alert alert-success'>{uzenet}</div>}

        <InputMezo label='Email' type='email' placeholder='example@example.hu' value={email} setValue={setEmail} />
        <InputMezo label='Jelszo' type='password' placeholder='*****' value={psw} setValue={setPsw} />

        <p>Forgot password?</p>

        <button className='signInBtn' onClick={onLogin}>Sign in</button>
        <button className='signInBtn'>Admin</button>

        <p>Don't have an account? <button className='signBtn' onClick={handleClick}>Sign up</button></p>
      </div>

      <div className='pictureBg'  >
        <p>"Traveling opens your mind, connects you with new cultures, and fills life with unforgettable experiences."</p>
      </div>

    </div>
  )
}

export default SignIn
