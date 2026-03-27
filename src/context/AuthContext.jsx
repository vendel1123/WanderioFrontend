import { createContext, useContext, useEffect, useState } from "react";

import { whoami, logout } from "../user";

const AuthContext = createContext()

export function AuthProvider({children}) {
    const [user, setUser] = useState(null)
    const [errorUser, setErrorUser] = useState('')
    const [ loading, setLoading] = useState(true)

    useEffect(() => {
        async function load() {
            //await new Promise(resolve => setTimeout(resolve, 5000))
            const data = await whoami()
            //console.log(data);
            if (!data.error) {
                setUser(data)
                return setLoading(false)
            }
            setUserError(data)
            return setLoading(false)
        }
        load()
    }, [])
    
    async function onLogout() {
        const data = await logout()

        if (data.error) {
            return setUserError(data.error)
        }
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, setUser, errorUser, onLogout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}