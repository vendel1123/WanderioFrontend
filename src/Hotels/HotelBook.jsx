import { useState, useEffect } from 'react'

import logo from '../assets/world.png'
import test from '../assets/signInImg.jpg'

import './HotelBook.css'

import { useNavigate, useParams } from 'react-router-dom'
import { getHotelDetails } from '../user'

export default function HotelBook() {

    const navigate = useNavigate()
    const { id: hotelID } = useParams()

    const [selectedRoom, setSelectedRoom] = useState(null)
    const [hotelData, setHotelData] = useState(null)

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)



    useEffect(() => {
        if (!hotelID) {
            setError("Hotel ID is missing from URL")
            setIsLoading(false)
            return
        }
        setIsLoading(true)
        getHotelDetails(hotelID)
            .then(data => {
                setHotelData(data)
                if (data && data.rooms && data.rooms.length > 0) {
                    setSelectedRoom(data.rooms[0])
                }
                setIsLoading(false)
            })
            .catch(err => {
                console.error('hiba  a hotel datainak lekeresekor', err)
                setError(err.message)
                setIsLoading(false)
            })

    }, [hotelID])

    // const handleBooking = () => {

    // }

    if (isLoading) {
        return <div>Loading hotel details...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    if (!hotelData) {
        return <div>Hotel not found or data is missing</div>
    }

    return (
        <div className='hotelBookPage'>
            <div className="nav">
                <div className="selectorLogo">
                    <li><p style={{ margin: '0' }}>Wanderio</p></li>
                    <li><img src={logo} alt="WanderioLogo" title='WanderioLogo' style={{ margin: '0' }} /></li>
                </div>
                <button className='back' onClick={() => navigate(-2)}>← Back</button>
            </div>

            <h3>{hotelData.name}</h3>

            <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {selectedRoom && selectedRoom.images && selectedRoom.images.length > 0 ? (
                        selectedRoom.images.map((imgSrc, index) => (
                            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                <img src={imgSrc} className='d-block w-50 mx-auto mb-0 rounded-5' alt={`${selectedRoom.typeName} - kép ${index + 1}`} />
                            </div>
                        ))
                    ) : (
                        <div className='carousel-item active'>
                            <img src={test} className="d-block w-50 mx-auto mb-0 rounded-5" alt="Placeholder" />
                        </div>
                    )}
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>

                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <div className="about">
                <h5>About this hotel</h5>
                <button className="grayLineH"></button>

                {hotelData.details ? (
                    hotelData.details.split('\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))
                ) : <p>No description avaible</p>}
            </div>

            <div className="detail">
                <h5>Room details</h5>
                <button className="grayLineH"></button>

                <div>
                    <p className='grayP'>ROOM Type</p>
                    <p>{selectedRoom.typeName}</p>               
                 </div>
                <div>
                    <p className='grayP'>CAPACITY</p>
                    <p>{selectedRoom.guests} person</p>
                </div>
                <div>
                    <p className='grayP'>SIZE</p>
                    <p>{selectedRoom.size} m²</p>
                </div>
            </div>

            <div className="bookNow">
                <h2>${selectedRoom.price}</h2>
                <small>per night</small>

                <input type="date" />
                <input type="date" />

                <button className='bookNowBtn'>Book Now</button>

                <button className='grayLineH'></button>
                <div className="info">
                    <p>✓ Free cancellation</p>
                    <p>✓ Instant confirmation</p>
                    <p>✓ Best price guaranteed</p>
                </div>

            </div>
        </div>
    )
}


