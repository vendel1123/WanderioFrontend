import { body, i, object, param } from "framer-motion/client"

const BACKEND_URL = '/users'
const BACKEND_FLIGHTS_URL = '/flights'
const BACKEND_CITIES_URL = '/cities'
const BACKEND_HOTELS_URL = '/hotels'


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

export async function getCityId(cityId) {
    const res = await fetch(`${BACKEND_CITIES_URL}/getcities/${cityId}`)

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}

export async function getCityDetails(cityId) {
    const res = await fetch(`${BACKEND_CITIES_URL}/detail/${cityId}`)

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}

// egy user torlese(admin)

export async function deleteUser(userID) {
    const res = await fetch(`${BACKEND_URL}/admin/deleteuser/${userID}`, {
        method: 'DELETE',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}

// user adatainak modositasa

export async function userEdit(userID, username, email, role) {
    try {
        const res = await fetch(`${BACKEND_URL}/admin/modifyuser/${userID}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {

                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                username,
                email,
                role
            })
        });

        if (!res.ok) {
            // Ha nem, megpróbáljuk kiolvasni a szerver hibaüzenetét és hibát dobunk vele.
            const errorData = await res.json().catch(() => ({ message: res.statusText }));
            throw new Error(`Hiba a felhasználó módosítása közben: ${errorData.message || res.statusText}`);
        }

        return await res.json();

    } catch (error) {
        console.error("userEdit hiba:", error);
        throw error;
    }
}

// hotel adatainak lekerese

export async function getHotels() {

    const res = await fetch(`${BACKEND_HOTELS_URL}/gethotels`, {
        method: 'GET',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}

// hotel letrehozasa

export async function createHotels(hotelData, imageFiles) {
    const formData = new formData()

    Object.keys(hotelData).forEach(key => {
        formData.append(key, hotelData[key])
    })

    if (imageFiles && imageFiles.lenght > 0) {
        imageFiles.forEach(file => {
            formData.append('images', file)
        })
    }

    const token = localStorage.getItem('token')

    const res = await fetch(`${BACKEND_HOTELS_URL}/createhotel`, formData, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer${token}`
            // 'Content-Type': 'multipart/form-data'
        },
        body: formData
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.error || 'Ismeretlen szerverhiba tortent a kep feltoltese soran')
    }

    return data
}
