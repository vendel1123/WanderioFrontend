import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import logo from '../assets/world.png'
 import edit from '../assets/edit.png'
 import lock from '../assets/lock.png'
import logoutImg from '../assets/logout.png'

import './Profile.css'

import { logout, whoami } from '../user'

export default function Profile() {

    const navigate = useNavigate()

    const [user,setUser] = useState(null)
    const [userError, setUserError] = useState(null)

    async function onLogout(){
        const data =  await logout()

        if(data.error){
            return setUserError(data.error)
        }
        setUser(null)
        navigate('/')
    }

    return (
        <>
            <div className='signUpLogo'>
                <img src={logo} alt="WanderioLogo" title='WanderioLogo' />
                <p>Wanderio</p>
            </div>

            <div className='profileContainer'>

                <div className='profileName'>
                    <p style={{fontWeight: 'bold',
                        fontSize:'1.5rem',
                        fontStyle:'italic',
                        margin:'0'
                    }}>László Béla</p>
                    <p style={{color: 'gray'}}>laszlob@gmail.com</p>
                </div>
                <button className='line'  style={{padding:1}}></button>

                <div className='editProfile'>
                    <img style={{ margin: 0 }} src={edit} alt="editProfile" />
                    <button> Name change</button>
                </div>

                <div className='editProfile' style={{marginBottom:"20%"}}>
                    <img style={{ margin: 0 }} src={lock} alt="lock" />
                    <button> Password change</button>
                </div>

                <button className='line' style={{padding:1}}></button>

                <div className='editProfile' onClick={onLogout}>
                    <img style={{ margin: 0 }} src={logoutImg} alt="lock" />
                    <button>Logout</button>
                </div>

            </div>
        </>
    )
}
