import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import logo from '../assets/world.png'
import InputMezo from '../components/InputMezo.jsx';

import {register, login} from '../user.js'
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

  async function onSignUp() {
    setHiba('')
    setUzenet('')

        // console.log(email, username, psw, psw2);
        if(!email || !username || !psw ){
            return setHiba('Minden mezot tolts ki')
        }

        try {
            const data = await register(email, username, psw)

            if(data.error){
                return setHiba(data.error)
            }

            setUzenet(data.message)
            login(email,psw)
            setTimeout(()=> navigate('/'),1000)

        } catch (err) {
            setHiba('Nem sikerult kapsolodni a backendhez')
            console.log(err);
        }

    }
  return (
    <div className='containerSignUp'>

      <div className='signUp'>
        <div className='signUpLogo'>
          <img src={logo} alt="WanderioLogo" title='WanderioLogo' />
          <p>Wanderio</p>
        </div>

        <h2>Sign up</h2>

        {hiba && <div className='alert alert-danger'>{hiba}</div>}
        {uzenet && <div className='alert alert-success'>{uzenet}</div>}

        <InputMezo label='Username' type='text' placeholder='John Doe' value={username} setValue={setUsername}/>
        <InputMezo label='Email' type='email' placeholder='example@example.hu' value={email} setValue={setEmail}/>
        <InputMezo label='Jelszo' type='password' placeholder='*****' value={psw} setValue={setPsw}/>


        <p>Forgot password?</p>

        <button className='signUpBtn' onClick={onSignUp}>Sign up</button>

        <p>Do u have an account? <button className='signBtn' onClick={handleClick}> Sign in</button></p>
      </div>

      <div className='pictureBg'>
        <p>""Some journeys change your location; others change your soul. Travel does both.""</p>
      </div>

    </div>
  )
}