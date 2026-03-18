import { backIn } from "framer-motion"

const BACKEND_URL = '/users'
const BACKEND_FLIGHTSURL = '/flights'


export async function register(email, username, psw) {
    const res = await fetch(`${BACKEND_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({ email, username, psw })

    })

    const data = await res.json()
    //    console.log(data);
    return data

}

export async function login(email, psw) {
    const res = await fetch(`${BACKEND_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, psw })

    })

    const data = await res.json()
    //    console.log(data);

    return data
}

export async function logout() {
    const res = await fetch(`${BACKEND_URL}/logout`, {
        method: 'POST',
        credentials: 'include'
    })
    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}


export async function whoami() {
    const res = await fetch(`${BACKEND_URL}/whoami`, {
        method: 'GET',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}

export async function flight(formData) {
    const res = await fetch(`${BACKEND_FLIGHTSURL}/createflight`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    })
    const data = await res.json()
    if(!res.ok){
        throw new Error(data.error)
    }

    return data
}

export async function pswchange(psw, newPsw){
    const res = await fetch(`${BACKEND_URL}/pswchange`,{
        method:'PUT',
        credentials: 'include',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            psw,
            newPsw
        })
    })
    const data = await res.json()
    return data
}

export async function namechange(username){
    const res = await fetch (`${BACKEND_URL}/namechange`,{
        method:'PUT',
        credentials:'include',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify({username})
    })

    return res.json()
}


export async function emailchange(email){
    const res = await fetch(`${BACKEND_URL}/emailchange`,{
        method:'PUT',
        credentials:'include',
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify({email})
    })

    const data = await res.json()
    return data
}