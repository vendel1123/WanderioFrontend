const BACKEND_URL = '/users'
const BACKEND_FLIGHTS_URL = '/flights'
const BACKEND_CITIES_URL = '/cities'
const BACKEND_HOTELS_URL = '/hotels'
const BACKEND_ATTRACTIONS_URL = '/attractions'
const BACKEND_ROOMS_URL = '/rooms'

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

export async function searchFlights(departure, destination, date) {

    const url = `${BACKEND_FLIGHTS_URL}/search?departure=${departure}&destination=${destination}&date=${date}`

    const res = await fetch(url, {
        method: 'GET',
        credentials:'include'
    })
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.error)
    }

    return data
}

export async function bookFlight(flightData){
    const res = await fetch(`${BACKEND_FLIGHTS_URL}/book`,{
        method:'POST',
        headers:{
            "Content-Type": "application/json",

        },
        credentials:'include',
        body:JSON.stringify(flightData)
    })

    return await res.json()
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
    const res = await fetch(`${BACKEND_CITIES_URL}/getcities`, {
        method: 'GET',
        credentials: 'include'
    })


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
    const formData = new FormData()

    Object.keys(hotelData).forEach(key => {
        formData.append(key, hotelData[key])
    })

    if (imageFiles && imageFiles.length > 0) {
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


//hotelek lekerese

export async function getHotelDetails(hotelID) {
    const res = await fetch(`${BACKEND_HOTELS_URL}/details/${hotelID}`)
    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}

// hotel adatainak a modositasa
export async function hotelEdit(hotelID, cityID, name, details, address) {
    try {
        const res = await fetch(`${BACKEND_HOTELS_URL}/updatehotel/${hotelID}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {

                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                cityID,
                name,
                details,
                address
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

//cities modositasa

export async function citiesEdit(cityID, name, country, description) {
    try {
        const res = await fetch(`${BACKEND_CITIES_URL}/updatecity/${cityID}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {

                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                cityID,
                name,
                country,
                description
            })
        })

        if (!res.ok) {
            // Ha nem, megpróbáljuk kiolvasni a szerver hibaüzenetét és hibát dobunk vele.
            const errorData = await res.json().catch(() => ({ message: res.statusText }));
            throw new Error(`Hiba a felhasználó módosítása közben: ${errorData.message || res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error("citiesEdit hiba:", error);
        throw error;
    }
}

//attraction modositasa 

export async function attractionEdit(attractionID, cityID, name, description, address, price) {
    try {
        const res = await fetch(`${BACKEND_ATTRACTIONS_URL}/updateatt/${attractionID}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {

                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                attractionID,
                cityID,
                name,
                description,
                address,
                price
            })
        })

        if (!res.ok) {
            // Ha nem, megpróbáljuk kiolvasni a szerver hibaüzenetét és hibát dobunk vele.
            const errorData = await res.json().catch(() => ({ message: res.statusText }));
            throw new Error(`Hiba a felhasználó módosítása közben: ${errorData.message || res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error("citiesEdit hiba:", error);
        throw error;
    }
}

export async function roomEdit(roomId,hotelID, typeId, available, price, guests, climate, arrival, starting, services, size) {
    try {
        const res = await fetch(`${BACKEND_ROOMS_URL}/updateroom/${roomId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {

                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                roomId,
                hotelID,
                typeId,
                available,
                price,
                guests,
                climate,
                arrival,
                starting,
                services,
                size
            })
        })

        if (!res.ok) {
            // Ha nem, megpróbáljuk kiolvasni a szerver hibaüzenetét és hibát dobunk vele.
            const errorData = await res.json().catch(() => ({ message: res.statusText }));
            throw new Error(`Hiba a felhasználó módosítása közben: ${errorData.message || res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error("citiesEdit hiba:", error);
        throw error;
    }
}

// egy hotel torlese(admin)

export async function deleteHotel(hotelID) {
    const res = await fetch(`${BACKEND_HOTELS_URL}/deletehotel/${hotelID}`, {
        method: 'DELETE',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}

export async function deleteRoom(roomId) {
    const res = await fetch(`${BACKEND_ROOMS_URL}/deleteroom/${roomId}`,{
        method:'DELETE',
        credentials:'include'
    })

    if(!res.ok){
        const data = await res.json()
        return {error: data?.error}
    }

    return await res.json()
}

// Új függvény a hotel kép feltöltéséhez
export async function uploadHotelImage(hotelID, formData) {
    const res = await fetch(`${BACKEND_HOTELS_URL}/upload-image/${hotelID}`, {
        method: 'POST',                    // POST ajánlott képfeltöltésnél
        credentials: 'include',
        body: formData
        // NE tedd bele a Content-Type fejlécet!
    });

    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        return { error: data?.error || 'Hiba történt a kép feltöltése közben' };
    }

    return await res.json();
}

//kepfeltoltes roomhoz

export async function uploadRoomImage(roomId, formData) {
    const res = await fetch(`${BACKEND_ROOMS_URL}/upload-image/${roomId}`, {
        method: 'POST',
        credentials: 'include',
        body: formData

    })

    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        return { error: data?.error || 'Hiba történt a kép feltöltése közben' };
    }

    return await res.json();

}

//cities kepek feltoltese

export async function uploadCityImage(cityID, formData) {
    const res = await fetch(`${BACKEND_CITIES_URL}/upload-image/${cityID}`, {
        method: 'POST',
        credentials: 'include',
        body: formData
    })

    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        return { error: data?.error || 'Hiba történt a kép feltöltése közben' };
    }

    return await res.json();
}

//attraction kepek feltoltese

export async function uploadAttractionImage(attractionID, formData) {
    const res = await fetch(`${BACKEND_ATTRACTIONS_URL}/upload-image/${attractionID}`, {
        method: 'POST',
        credentials: 'include',
        body: formData
    })

    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        return { error: data?.error || 'Hiba történt a kép feltöltése közben' };
    }

    return await res.json();
}

//attraction-ok lekerese
export async function getAllAttraction() {
    const res = await fetch(`${BACKEND_ATTRACTIONS_URL}/getatt`, {
        method: 'GET',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}

//admin hotelek lekerese
export async function getAdHotels() {

    const res = await fetch(`${BACKEND_HOTELS_URL}/admin/getadhotel`, {
        method: 'GET',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}

//varos torlese
export async function deleteCities(cityID) {
    const res = await fetch(`${BACKEND_CITIES_URL}/deletecity/${cityID}`, {
        method: 'DELETE',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}

//attraction torlese 

export async function deleteAttraction(attractionID) {
    const res = await fetch(`${BACKEND_ATTRACTIONS_URL}/deleteatt/${attractionID}`, {
        method: 'DELETE',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}

// flights lekerese adminhoz
export async function getAdFlights() {
    const res = await fetch(`${BACKEND_FLIGHTS_URL}/adgetflights`, {
        method: 'GET',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}

// flights modositasa adminhoz
export async function flightEdit(flightsId, airlineId, starting, arivval, price, departureCityID, destinationCityID) {
    try {
        const res = await fetch(`${BACKEND_FLIGHTS_URL}/updateflight/${flightsId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {

                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                flightsId,
                airlineId,
                starting,
                arivval,
                price,
                departureCityID,
                destinationCityID
            })
        })

        if (!res.ok) {
            // Ha nem, megpróbáljuk kiolvasni a szerver hibaüzenetét és hibát dobunk vele.
            const errorData = await res.json().catch(() => ({ message: res.statusText }));
            throw new Error(`Hiba a flight módosítása közben: ${errorData.message || res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error("flightEdit hiba:", error);
        throw error;
    }
}

//flight torlese 

export async function deleteFlight(flightsId) {
    const res = await fetch(`${BACKEND_FLIGHTS_URL}/deleteflight/${flightsId}`, {
        method: 'DELETE',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}

//admin szobak lekerese
export async function getAdRooms() {
    const res = await fetch(`${BACKEND_ROOMS_URL}/adgetroom`, {
        method: 'GET',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}


//

export async function createHotelBooking(bookingData){
    const res = await fetch(`${BACKEND_HOTELS_URL}/book`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(bookingData)
    })

    if(!res.ok){
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}