import { useState, useEffect } from 'react'

import logo from '../assets/world.png'
import test from '../assets/signInImg.jpg'

import './HotelBook.css'

import { useNavigate, useParams } from 'react-router-dom'
import { getHotelDetails, createHotelBooking } from '../user'



export default function HotelBook() {

    const navigate = useNavigate()
    const { id: hotelID } = useParams()

    const [selectedRoom, setSelectedRoom] = useState(null)
    const [hotelData, setHotelData] = useState(null)

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [numberOfNights, setNumberOfNights] = useState(0)
    const [bookingStatus, setBookingStatus] = useState({ message: "type:" })

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

    useEffect(() => {
        if (startDate && endDate) {
            const start = new Date(startDate)
            const end = new Date(endDate)
            if (end > start) {
                const diffTime = Math.abs(end - start)
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                setNumberOfNights(diffDays)
            }
            else {
                setNumberOfNights(0)
            }
        }
    }, [startDate, endDate])

    const handleBooking = async () => {
        if (!selectedRoom) {
            setBookingStatus({ message: "Please select a room first", type: 'error' })
            return
        }
        if (numberOfNights <= 0) {
            setBookingStatus({ message: "Please select a valid date.", type: 'error' })
            return
        }

        const bookingData = {
            hotelID: hotelData.hotelID,
            roomId: selectedRoom.roomId,
            days: numberOfNights
        }

        setBookingStatus({ message: "Booking in progress", type: 'loading' })

        try {
            const result = await createHotelBooking(bookingData)
            setBookingStatus({ message: result.message || 'Booking successfull!', type: 'succes' })
            setTimeout(() => {
                navigate('/cart')
            }, 2000);
        } catch (err) {
            console.log('Booking failed', err);
        }

    }

    if (isLoading) {
        return <div>Loading hotel details...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    if (!hotelData || !selectedRoom) {
        return <div>Hotel or room data is not found </div>
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
                <h1>Complete Your Booking</h1>
                <div className='bookNowDiv'>
                    <div style={{marginRight:'1rem'}}>
                        <label htmlFor="start-date">Check-in</label>
                        <input
                            type="date"
                            id="start-date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            min={new Date().toString().split('T')[0]}
                        />
                    </div>
                    <div style={{marginLeft:'1rem'}}>
                        <label htmlFor="end-date">Check-out</label>
                        <input
                            type="date"
                            id='end-date'
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            min={startDate}
                        />
                    </div>

                </div>

                <div className="bookPrice">
                    <div className="total">
                        <p>Per night:</p>
                        <h2>${selectedRoom.price}</h2>
                    </div>
                    <button className='linePrice'></button>
                    <div className='total'>
                        <p >Total: </p> {numberOfNights > 0 && <h4><div style={{ color: '#378ADD', fontWeight: 'bold' }}> ${selectedRoom.price * numberOfNights}</div></h4>}
                    </div>
                </div>

                <button className='bookNowBtn' onClick={handleBooking} disabled={bookingStatus.type === 'loading'}>{bookingStatus.type === 'loading' ? 'Processing..' : ` ${numberOfNights} night(s)`}</button>

                {bookingStatus.message && (
                    <div className={`booking-status ${bookingStatus.type}`}>
                        {bookingStatus.message}
                    </div>
                )}

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


