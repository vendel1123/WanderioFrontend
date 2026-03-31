import { b, param } from "framer-motion/client"

const BACKEND_URL = '/users'
const BACKEND_FLIGHTS_URL = '/flights'
const BACKEND_CITIES_URL = '/cities'


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
    const res = await fetch(`${BACKEND_FLIGHTS_URL}/createflight`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    })
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.error)
    }

    return data
}

export async function pswchange(psw, newPsw) {
    const res = await fetch(`${BACKEND_URL}/pswchange`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
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

export async function namechange(username) {
    const res = await fetch(`${BACKEND_URL}/namechange`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ username })
    })

    return res.json()
}


export async function emailchange(email) {
    const res = await fetch(`${BACKEND_URL}/emailchange`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email })
    })

    const data = await res.json()
    return data
}

//get all users
export async function getAllUsers() {
    const res = await fetch(`${BACKEND_URL}/admin/alluser`, {
        method: 'GET',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}

//varosok 

export async function getAllCities() {
    const res = await fetch(`${BACKEND_CITIES_URL}/getcities`)

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}

// @param {string | number} cityId


export async function getCityId(cityId) {
    const res = await fetch(`${BACKEND_CITIES_URL}/getcities/${cityId}`)

    if(!res.ok){
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}

export async function getCityDetails(cityId){
    const res = await fetch(`${BACKEND_CITIES_URL}/detail/${cityId}`)

    if(!res.ok){
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}