import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import logo from '../assets/world.png'
import edit from '../assets/edit.png'
import lock from '../assets/lock.png'
import logoutImg from '../assets/logout.png'
import emailImg from '../assets/changeUser.png'

import './Profile.css'

import { logout, whoami, pswchange, namechange, emailchange } from '../user'

export default function Profile() {

    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [userError, setUserError] = useState(null)

    const [editingName, setEditingName] = useState(false)
    const [newName, setNewName] = useState('')

    const [editPassword, setEditPassword] = useState(false)
     const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const [editEmail, setEditEmail] = useState(false)
    const [newEmail, setNewEmail] = useState('')

    useEffect(() => {
        async function fetcUser() {
            const data = await whoami()
            console.log(data);
            if (data.error) {
                setUserError(data.error)
            } else {
                setUser(data)
            }
        }
        fetcUser()
    }, [])

    async function onLogout() {
        const data = await logout()

        if (data.error) {
            return setUserError(data.error)
        }
        setUser(null)
        navigate('/')
    }

    async function handleNameChange() {
        if(!newName){
            return setUserError('You cant left the name field empty')
        }

        const data = await namechange(newName)

        if (data.error) {
            return setUserError(data.error)
        }

        setUser(prev => ({ ...prev, username: newName }))

        setEditingName(false)
        setNewName('')
    }

    async function passwordChange() {

        if(!newPassword){
            return setUserError('You cant left the password field empty.')
        }

        const data = await pswchange( oldPassword,newPassword)

        if (data.error) {
            return setUserError(data.error)
        }
        alert('Successful password change')
        setEditPassword(false)
        setOldPassword('')
        setNewPassword('')

    }

    async function emailChange() {
        if(!newEmail){
            return setUserError('Write down a new email addres!')
        }

        const data = await emailchange(newEmail)
        if(data.error){
            return setUserError(data.error)
        }

        setUser(prev => ({...prev, email: newEmail}))

        setEditEmail(false)
        setNewEmail('')
    }

    return (
        <div className='profileWhole'>
            <div className='signUpLogo'>
                <img src={logo} alt="WanderioLogo" title='WanderioLogo' />
                <p>Wanderio</p>
            </div>

            <div className='profileContainer'>

                <div className='profileName'>
                    <p style={{
                        fontWeight: 'bold',
                        fontSize: '1.5rem',
                        fontStyle: 'italic',
                        margin: '0'
                    }}>{user?.username}</p>
                    <p style={{ color: 'gray' }}>{user?.email}</p>
                </div>
                <button className='line' style={{ padding: 1 }}></button>

                <div className='editProfile' onClick={() => setEditingName(!editingName)}>
                    <img style={{ margin: 0 }} src={edit} alt="editProfile" />
                    <button > Name change</button>
                </div>

                {editingName && (
                    <div className='editingNameDiv'>
                        <input type="text"
                            placeholder='New Name'
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                        <button onClick={handleNameChange}>
                            Save changes
                        </button>
                    </div>
                )}

                <div className='editProfile' style={{ marginBottom: "2%" }} onClick={() => setEditPassword(!editPassword)}>
                    <img style={{ margin: 0 }} src={lock} alt="lock" />
                    <button > Password change</button>
                </div>

                {editPassword && (
                    <div className='editingPasswordDiv'>
                        <div className='editDiv'>
                             <input type="password"
                                placeholder='Old password'
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            /> 
                            <input type="password"
                                placeholder='New password'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        <button onClick={passwordChange}>
                            Save Changes
                        </button>

                    </div>
                )}

                <div className='editProfile' style={{ marginBottom: "2%" }} onClick={() => setEditEmail(!editEmail)}>
                    <img style={{ margin: 0 }} src={emailImg} alt="lock" />
                    <button>Email change</button>
                </div>

                {editEmail && (
                    <div className='editingPasswordDiv'>
                        <div className='editDiv'>
                            <input type="email"
                                placeholder='New email'
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                            />

                        </div>

                        <button onClick={emailChange}>
                            Save Changes
                        </button>

                    </div>
                )}

                <button className='line' style={{ padding: 1 }}></button>

                <div className='editProfile' onClick={onLogout}>
                    <img style={{ margin: 0 }} src={logoutImg} alt="lock" />
                    <button>Logout</button>
                </div>

                {userError && <p style={{ color: 'red' }}>{userError}</p>}

            </div>

            <button className='profileBtn' onClick={()=>navigate('/selector')}>← Back</button>
        </div>
    )
}
