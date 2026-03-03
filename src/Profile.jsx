
import logo from './assets/world.png'
 import edit from './assets/edit.png'
 import lock from './assets/lock.png'
import logout from './assets/logout.png'

import './Profile.css'

export default function Profile() {

    return (
        <>
            <div className='signUpLogo'>
                <img src='' alt="WanderioLogo" title='WanderioLogo' />
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
                <button className='line'></button>

                <div className='editProfile'>
                    <img style={{ margin: 0 }} src={edit} alt="editProfile" />
                    <button> Name change</button>
                </div>

                <div className='editProfile' style={{marginBottom:"20%"}}>
                    <img style={{ margin: 0 }} src={lock} alt="lock" />
                    <button> Password change</button>
                </div>

                <button className='line'></button>

                <div className='editProfile'>
                    <img style={{ margin: 0 }} src={logout} alt="lock" />
                    <button>Logout</button>
                </div>

            </div>
        </>
    )
}
