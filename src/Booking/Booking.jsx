import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { getCityDetails } from '../user'

import './Booking.css'

import cart from "../assets/cart.png"
import avatar from "../assets/avatar.png"
import logo from "../assets/world.png"

import information from "../assets/BookingImgs/information.png"
import summary from "../assets/BookingImgs/summary.png"
import support from "../assets/BookingImgs/support.png"
import vip from "../assets/BookingImgs/vip.png"
import verified from '../assets/verified.png'
import bestprice from '../assets/best-price.png'
import cashback from '../assets/cashback.png'
import customerSupp from '../assets/customer-support.png'
import nomoney from '../assets/no-money.png'

import test from '../assets/signInImg.jpg'

export default function Booking() {

    const navigate = useNavigate()

    const { id } = useParams()

    const [cityData, setCityData] = useState(null)

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {

        if (!id) {
            setIsLoading(false)
            setError("Nincs megadva a varos azonositoja")
            return
        }

        setIsLoading(true)
        setError(null)

        getCityDetails(id)
            .then(data => {
                setCityData(data)
                setIsLoading(false)
            })
            .catch(err => {
                console.error(`hiba az ${id} azonositoju varos lekeresekor`, err)
                setError(err.message || "A varos adatait nem sikerult betolteni ")
                setIsLoading(false)
            })


    }, [id])

    if (isLoading) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}><h1>Adatok betoltese</h1></div>
    }

    if (!cityData) return null


    return (
        <div className='hole'>
            <ul className="nav" style={{ borderBottom: "2px solid gray" }}>
                <div className="selectorLogo">
                    <li><p>Wanderio</p></li>
                    <li><img src={logo} alt="WanderioLogo" title='WanderioLogo' /></li>
                </div>
                <div className='selectDiv'>
                    <li><img src={avatar} alt="" onClick={() => navigate("/profile")} /></li>
                    <li style={{ borderRight: "solid 2px grey", }}><img style={{ marginRight: "0.8rem", marginBottom: '5px' }} src={cart} alt="" onClick={() => navigate("/cart")} /></li>
                    <li style={{ borderRight: "solid 2px grey", }}><a href='#description' style={{ textDecoration: 'none', color: 'inherit' }}><h3 style={{ marginRight: "0.5rem", marginTop: '10px', fontWeight: "bold" }}>Description</h3></a></li>
                    <li style={{ borderRight: "solid 2px grey", }}><a href='#guide' style={{ textDecoration: 'none', color: 'inherit' }}><h3 style={{ marginRight: "0.5rem", marginTop: '10px', fontWeight: "bold" }}>Guide</h3></a></li>
                </div>
            </ul>

            <h1>{cityData.name}</h1>
            <div key={id} id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {cityData.images && cityData.images.length > 0 ? cityData.images.map((imgSrc, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <img src={imgSrc} className='d-block w-50 mx-auto mb-0 rounded-5' alt={`${cityData.name} nezet ${index + 1}`} />
                        </div>
                    ))
                        : (
                            <div className="carousel-item active" data-bs-interval="10000">
                                <img src={test} className="d-block w-50 mx-auto mb-0 rounded-5" alt="..." />
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

            <div className='whole' >
                <div className="left" style={{margin:"2rem auto"}}>
                    <div id='descrip    tion' className='description'>
                        <img src={information} alt="" />
                        <h3>Description</h3>
                    </div>

                    <button></button>
                    <p>{cityData.description || "Nincsen leiras ehez a varoshoz"}</p>
                </div>

                <div className="right" style={{margin:"2rem auto"}}>
                    <div className='summaryDiv'>
                        <div className='description'>
                            <img src={summary} alt="Summarry" />
                            <h3>Summary</h3>

                        </div>
                        <button></button>
                        <div className='summary'>
                            <div className='flights' onClick={() => navigate('/flights')}>
                                <img src={vip} alt="" />
                                <p>Flights</p>
                            </div>

                            <div className='hotels' onClick={() => navigate(`/hotels/${id}`)}>
                                <img src={vip} alt="" />
                                <p>Hotels</p>
                            </div>
                        </div>
                    </div>


                    <div className='bookNowDiv'>
                        <button onClick={() => navigate(`/hotels/${id}`)}>Book now</button>
                    </div>



                    <div className='summaryChoices'>
                        <div>
                            <img src={support} alt="" />
                            <p>24/7 customar support
                            </p>
                        </div>

                        <div>
                            <img src={verified} alt="" />
                            <p>Best price guarantee</p>
                        </div>

                        <div style={{ marginBottom: '0px' }}>
                            <img src={vip} alt="" />
                            <p>Free parking</p>
                        </div>

                    </div>
                </div>


            </div>
            <h1 id='guide' style={{
                justifyContent: 'center',
                fontStyle: 'italic',
                marginTop: '5%',
                marginBottom: '5%'
            }}>How it works</h1>
            <div className='whole' style={{display:'flex'}}>

                <div className="left">
                    <div className='description'>
                        <img src={information} alt="" />
                        <h3>Secure your accommodation</h3>
                    </div>
                    <button></button>
                    <p style={{ marginBottom: '3%' }}>Secure your place to stay instantly on Paris's most trusted travel marketplace. As soon as you reserve, we lock in your room to help you make the most of your trip.You'll get the best price and a secure payment system that protects your information.</p>
                </div>

                <div className="right">
                    <div className="rightDiv">
                        <div className='description'>
                        <img src={summary} alt="Summarry" />
                        <h3>Get instant confirmation</h3>
                    </div>
                    <button></button>
                    <p style={{ marginBottom: '1%' }}>
                        You'll receive your booking confirmation and a detailed summary immediately after checkout, including check-in time, property address, and contact details. Enjoy peace of mind and get exactly what you booked—or your money back. No surprises, no hidden fees.
                    </p>
                    </div>
                </div>

            </div>

            <div className='whole' style={{display:'flex'}}>

                <div className="left">
                    <div className='description'>
                        <img src={information} alt="" />
                        <h3>Get access to the VIP Club</h3>
                    </div>
                    <button></button>
                    <p style={{ marginBottom: '3%' }}>Booking with us gives you access to the Guide to Paris VIP Club, where you'll enjoy priority service, special perks, and exclusive discounts for amazing savings on your trip at Paris's top restaurants, shops, and local favorites.</p>
                </div>

                <div className="right">
                    <div className="rightDiv">
                        <div className='description'>
                        <img src={summary} alt="Summarry" />
                        <h3>Stay with confidence</h3>
                    </div>
                    <button></button>
                    <p style={{ marginBottom: '3%' }}>From check-in to check-out, we're here to support your stay. Whatever you need, whenever you need it, we're just seconds away, 24/7—ready to help you enjoy every moment of your time in Paris.</p>

                    </div>
                </div>

            </div>

            <div className='guarantee'>
                <div className='guaranteeDiv' style={{ marginBottom: '2%' }}>
                    <img src={summary} alt="" />
                    <h2 style={{
                        color: 'white',
                        ontStyle: 'italic',
                        fontWeight: "bold"
                    }}>We guarantee</h2>
                </div>
                <p>Your trip is protected, personalized, and priced right. No surprises, no stress.</p>
            </div>

            <div className='guaranteeDice'>

                <div className='guaranteeDiceItem' >
                    <img src={cashback} alt="" />
                    <p>Free cancellation & full refund
                    </p>
                </div>

                <div className='guaranteeDiceItem'>
                    <img src={bestprice} alt="" />
                    <p>Best price always guaranteed</p>
                </div>



                <div className='guaranteeDiceItem' >
                    <img src={customerSupp} alt="" />
                    <p>Unlimited changes and support</p>
                </div>

                <div className='guaranteeDiceItem'>
                    <img src={nomoney} alt="" />
                    <p>0% booking & credit card fees</p>
                </div>

            </div>

            <h2 style={{
                justifyContent: 'left',
                marginLeft: '3%',
                fontStyle: 'italic',
                fontWeight: "bold",
                marginTop: '5%',
                marginBottom: '2%',
                color: '#336699',
                display: 'flex',
                justifyContent: 'center'
            }}>Attractions nearby</h2>

            <div className='attractions'>

                {cityData.attractions && cityData.attractions.map(attraction => (
                    <div key={attraction.attractionID} className="card" style={{ width: '50%', borderTopLeftRadius: '3rem', borderTopRightRadius: '3rem' }}>
                        {/* <img src={...} /> Itt lehetne az attrakció képe, ha lenne a DB-ben */}
                        <img style={{ borderTopLeftRadius: '3rem', borderTopRightRadius: '3rem',borderBottomRightRadius:'2rem', borderBottomLeftRadius:'2rem' }} src={attraction.images && attraction.images.length > 0 ? attraction.images[0] : test} className='card-img-top' alt={attraction.name} />
                        <div className="card-body">
                            <p style={{ fontWeight: 'bold' }}>{attraction.name}</p>
                            <p>{attraction.description}</p>
                            <button className='grayLine'></button>
                            <p style={{ marginBottom: '0' }}><strong>${attraction.price}</strong></p>
                            <p style={{ color: 'gray' }}>per person</p>
                        </div>
                    </div>
                ))}


            </div>

            <h2 style={{
                justifyContent: 'left',
                marginLeft: '3%',
                fontStyle: 'italic',
                marginTop: '5%',
                marginBottom: '5%',
                color: '#336699',
                display: 'flex',
                justifyContent: 'center'
            }}>Hotels</h2>

            <div className='hotels' style={{
                width: '50%', display: 'flex', gap: '1.5rem', margin: '0 auto', justifyContent: 'center'
            }}>

                {cityData.hotels && cityData.hotels.map(hotel => (
                    <div key={hotel.hotelID} className="card mb-3" style={{ maxWidth: "540px", borderTopLeftRadius: '2rem', borderTopRightRadius: '2rem', borderBottomRightRadius: '2rem', borderEndStartRadius: '2rem  ' }}>
                        <div className="row g-0" style={{ maxWidth: "540px", height: '400px', overflow: 'hidden' }}><img style={{ borderTopLeftRadius: '2rem', borderTopRightRadius: '2rem' , borderBottomRightRadius:'2rem', borderBottomLeftRadius:'2rem',height: '200px' }} src={hotel.images && hotel.images.length > 0 ? hotel.images[0] : test} alt="" />
                            <div className="col-md-18">

                                <div className="card-body">
                                    <h5 className="card-title" style={{ color: 'white' }}>{hotel.name}</h5>
                                    <p className="card-text">{hotel.details}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            <div className='divBtn'>
                <button onClick={() => navigate(`/hotels/${id}`)}>See More</button>
            </div>

            <div className='footers'>
                <div className="selectorLogos" style={{ marginLeft: '5%', color:'black' }}>
                    <li><img src={logo} alt="WanderioLogo" title='WanderioLogo' /></li>
                    <li><p>Wanderio</p></li>
                </div>

                <div className='travels'>
                    <div className='texts'>

                        <h4 >TRAVEL & LEISURE</h4>
                        <p>Things to do in the countryside</p>
                        <p>Places to go</p>
                        <p style={{ marginBottom: '0' }}>Things to do in the world</p>
                    </div>

                    <div className="contact">
                        <h4 >CONTACT US</h4>
                        <p>About us</p>
                        <p>Useful information</p>
                        <p style={{ marginBottom: '0' }}>Privacy policy</p>
                    </div>


                </div>

                <div className='dsa'>
                    <button className='footerBtn'></button>
                </div>

                <div className='last'>
                    <p style={{
                        margin: '0',
                        color: 'black',
                        fontWeight: 'bold'
                    }}> Copyrights © 2025 Wanderio - All rights reserved</p>
                </div>

            </div>


        </div>
    )
}