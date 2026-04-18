import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import logo from '../assets/world.png'
import InputMezo from '../components/InputMezo.jsx';

import { register, login } from '../user.js'
import './SignUp.css'


export default function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [psw, setPsw] = useState('')

  const [hiba, setHiba] = useState('')
  const [uzenet, setUzenet] = useState('')

  const handleClick = () => {
    navigate("/");
  };

  async function onSignUp(event) {

    event.preventDefault()
    setHiba('')
    setUzenet('')

    // console.log(email, username, psw, psw2);
    if (!username) {
      return setHiba('Ad meg a username mezot')
    }
    else if (psw.length < 5) {
      return setHiba('A jelszonak legalabb 5 betunek kell lennie')
    }
    if (!email) {
      return ("Az emailcim kitoltese kotelezo!")
    }
    else if (!/\S+@\S+\.\S+/.test(email)) {
      // Egyszerű regex az e-mail formátum ellenőrzésére
      return setHiba('Érvénytelen e-mail formátum.(a@a.hu)');
    }

    try {
      const data = await register(email, username, psw)

      if (data.error) {
        return setHiba(data.error)
      }

      setUzenet(data.message)
      login(email, psw)
      setTimeout(() => navigate('/'), 1000)

    } catch (err) {
      setHiba('Nem sikerult kapsolodni a backendhez')
      console.log(err);
    }
  }

  return (
    <div className='containerSignUp'>

      <form className='signUp' onSubmit={onSignUp}>
        <div className='signUpLogo'>
          <img src={logo} alt="WanderioLogo" title='WanderioLogo' />
          <p>Wanderio</p>
        </div>

        <h2>Sign up</h2>

        {hiba && <div className='alert alert-danger' style={{ border: '1px solid black' }}>{hiba}</div>}
        {uzenet && <div className='alert alert-success' style={{ border: '1px solid black' }}>{uzenet}</div>}

        <InputMezo label='Username' type='text' placeholder='John Doe' value={username}  setValue={setUsername} />
        <InputMezo label='Email' type='email' placeholder='example@example.hu' value={email} setValue={setEmail} />
        <InputMezo label='Password' type='password' placeholder='*****' value={psw} setValue={setPsw} />


        <p>Forgot password?</p>

        <button className='signUpBtn' type='submit' onClick={onSignUp}>Sign up</button>

        <p>Do u have an account? <button className='signBtn' onClick={handleClick}> Sign in</button></p>
      </form>

      <div className='pictureBg'>
        <p>""Some journeys change your location; others change your soul. Travel does both.""</p>
      </div>

    </div>
  )
}