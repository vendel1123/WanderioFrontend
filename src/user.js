const BACKEND_URL = 'http://127.0.0.1:4000/api/users'

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