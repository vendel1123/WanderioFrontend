import { createContext, useContext, useEffect, useState } from "react";

import { getHotels } from "../user";

const HotelContext = createContext()

export function HotelProvider({ children }) {
    const [hotels, setHotels] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [hotelError, setHotelError] = useState(null);

    useEffect(()=>{
        async function load() {
            const data = await getHotels()
            if (!data.error) {
                setHotels(data)
                return setLoading(false)
            }
            setHotelError(data)
            return setLoading(false)
        }
        load()
    }, [])

    return (
        <HotelContext.Provider value={{hotels, setHotels, hotelError, loading}}>
            {children}
        </HotelContext.Provider>
    )
}

export function useHotel() {
    return useContext(HotelContext)
}