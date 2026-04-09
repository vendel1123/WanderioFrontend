import { useState, useEffect } from 'react'

import logo from '../assets/world.png'
import test from '../assets/signInImg.jpg'

import './Hotels.css'

import { useNavigate, useParams } from 'react-router-dom'
import { getCityDetails, getHotels } from '../user'

export default function Hotels() {

    const navigate = useNavigate()

    const [hotels, setHotels] = useState(null)
    const [cityName, setCityName] = useState('')



    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const { id: cityID } = useParams()

    useEffect(() => {
        if (!cityID) {
            setError("City ID is missing.")
            setIsLoading(false)
            return
        }

        getCityDetails(cityID).then(data => {
            console.log("backendrol erkezo adat:", data);

            setCityName(data.name)
            setHotels(data.hotels)

            setIsLoading(false)
        })
            .catch(err => {
                setError(err.message)
                setIsLoading(false)
            })

    }, [cityID])

    if (isLoading) {
        return <div>Loading hotels...</div>
    }
    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className='hotelPage'>
            <div className="nav">
                <div className="selectorLogo">
                    <li><img src={logo} alt="WanderioLogo" title='WanderioLogo' /></li>
                    <li><p>Wanderio</p></li>
                </div>
            </div>

            <h3>Hotels in {cityName}</h3>

            <div className="attractions">

                {hotels?.map((hotel) => (
                    <div key={hotel.hotelID} className="card" style={{ width: '50%' }}>
                        <img
                            style={{
                                borderRadius: '1.5rem',
                                borderEndStartRadius: '0',
                                borderBottomRightRadius: '0',
                                height: '400px',
                                objectFit: 'fill'
                            }}
                            /* JAVÍTÁS: Mivel a backend már a kész URL-t küldi 'hotelImg' néven, 
                               elég csak ezt használni. Ha nincs kép, a 'test' (signInImg.jpg) jelenik meg. */
                            src={hotel.hotelImg ? hotel.hotelImg : test}
                            className="card-img-top"
                            alt={hotel.name}
                        />

                        <div className="card-body">
                            <p style={{ fontWeight: 'bold' }} className="card-text">{hotel.name}</p>
                            <p style={{ margin: '1rem 0' }}>{hotel.details}</p>

                            {/* BIZTONSÁGI ELLENŐRZÉS: Csak akkor próbáljuk kiírni a szobaadatokat, ha léteznek */}
                            {hotel.cheapestRoom ? (
                                <>
                                    <p className='grayP'>ROOM TYPE</p>
                                    <p className='boldP'>{hotel.cheapestRoom.typeName}</p>
                                    <p className='grayP'>GUESTS</p>
                                    <p className='boldP'>{hotel.cheapestRoom.guests} Adults</p>

                                    <button className='grayLine'></button>

                                    <div className="book">
                                        <p style={{ marginBottom: '0' }}>
                                            <strong>${hotel.cheapestRoom.price}/night</strong>
                                        </p>
                                        <button onClick={() => navigate(`/hotelBook/${hotel.hotelID}`)}>Book</button>
                                    </div>
                                </>
                            ) : (
                                <div className="mt-3">
                                    <p className="text-muted small italic">No specific room data available</p>
                                    <button className='grayLine'></button>
                                    <div className="book">
                                        <button onClick={() => navigate(`/hotelBook/${hotel.hotelID}`)}>Details</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}


                <button className='grayLine' style={{
                    width: '80%',
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '1rem auto'
                }}></button>
            </div>
            <button className='back' onClick={() => navigate(-1)}>← Back</button>
        </div>
    )
}