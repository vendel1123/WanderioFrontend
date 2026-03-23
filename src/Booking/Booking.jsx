import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import './Booking.css'


import cart from "../assets/cart.png"
import avatar from "../assets/avatar.png"
import logo from "../assets/world.png"

import information from "../assets/BookingImgs/information.png"
import summary from "../assets/BookingImgs/summary.png"
import support from "../assets/BookingImgs/support.png"
import vip from "../assets/BookingImgs/vip.png"
import verified from '../assets/verified.png'

import test from '../assets/signInImg.jpg'
import { correctBorderRadius } from 'framer-motion'

export default function Booking() {

    const navigate = useNavigate()

    return (
        <div className='hole'>
            <ul className="nav" style={{ borderBottom: "2px solid gray" }}>
                <div className="selectorLogo">
                    <li><p>Wanderio</p></li>
                    <li><img src={logo} alt="WanderioLogo" title='WanderioLogo' /></li>
                </div>
                <div>
                    <li><img src={avatar} alt="" onClick={() => navigate("/profile")} /></li>
                    <li style={{ borderRight: "solid 2px grey", }}><img style={{ marginRight: "0.8rem", marginBottom: '5px' }} src={cart} alt="" onClick={() => navigate("/cart")} /></li>
                    <li style={{ borderRight: "solid 2px grey", }}><a href='#description' style={{ textDecoration: 'none', color: 'inherit' }}><h3 style={{ marginRight: "0.5rem", marginTop: '10px' }}>Description</h3></a></li>
                    <li style={{ borderRight: "solid 2px grey", }}><a href='#guide' style={{ textDecoration: 'none', color: 'inherit' }}><h3 style={{ marginRight: "0.5rem", marginTop: '10px' }}>Guide</h3></a></li>
                </div>
            </ul>

            <h1>Paris</h1>
            <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                        <img src={test} className="d-block w-50 mx-auto mb-0 rounded-5" alt="..." />
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <img src={logo} className="d-block w-50 mx-auto mb-0 rounded-5" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={test} className="d-block w-50 mx-auto mb-0 rounded-5" alt="..." />
                    </div>
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
                <div className="left">
                    <div id='description' className='description'>
                        <img src={information} alt="" />
                        <h3>Description</h3>
                    </div>

                    <button></button>
                    <p>
                        Paris, often called the City of Light, is the capital of France and one of the world's most iconic cities. Known for its art, fashion, history, and romance, Paris is home to landmarks like the Eiffel Tower, the Louvre Museum, and the Notre-Dame Cathedral. The city is also famous for its charming cafés, scenic Seine River, and beautiful architecture that blends tradition with modernity.
                    </p>
                </div>

                <div className="right">
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

                        <div className='hotels' onClick={() => navigate('/hotels')}>
                            <img src={vip} alt="" />
                            <p>Hotels</p>
                        </div>
                    </div>


                    <div className='bookNowDiv'>
                        <button>Book now</button>
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
                marginTop: '10%',
                marginBottom: '10%'
            }}>How it works</h1>
            <div className='whole'>

                <div className="left">
                    <div className='description'>
                        <img src={information} alt="" />
                        <h3>Secure your accommodation</h3>
                    </div>
                    <button></button>
                    <p style={{ marginBottom: '3%' }}>Secure your place to stay instantly on Paris's most trusted travel marketplace. As soon as you reserve, we lock in your room to help you make the most of your trip.You'll get the best price and a secure payment system that protects your information.</p>
                </div>

                <div className="right">
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

            <div className='whole' >

                <div className="left">
                    <div className='description'>
                        <img src={information} alt="" />
                        <h3>Get access to the VIP Club</h3>
                    </div>
                    <button></button>
                    <p style={{ marginBottom: '3%' }}>Booking with us gives you access to the Guide to Paris VIP Club, where you'll enjoy priority service, special perks, and exclusive discounts for amazing savings on your trip at Paris's top restaurants, shops, and local favorites.</p>
                </div>

                <div className="right">
                    <div className='description'>
                        <img src={summary} alt="Summarry" />
                        <h3>Stay with confidence</h3>
                    </div>
                    <button></button>
                    <p style={{ marginBottom: '3%' }}>From check-in to check-out, we're here to support your stay. Whatever you need, whenever you need it, we're just seconds away, 24/7—ready to help you enjoy every moment of your time in Paris.</p>

                </div>

            </div>

            <div className='guarantee'>
                <div style={{ marginBottom: '2%' }}>
                    <img src={summary} alt="" />
                    <h2 style={{
                        color: '#336699',
                        ontStyle: 'italic',
                    }}>We guarantee</h2>
                </div>
                <p>Your trip is protected, personalized, and priced right. No surprises, no stress.</p>
            </div>

            <div className='guaranteeDice'>

                <div className='guaranteeDiceItem' >
                    <img src={summary} alt="" />
                    <p>Free cancellation & full refund
                    </p>
                </div>

                <div className='guaranteeDiceItem'>
                    <img src={summary} alt="" />
                    <p>Best price always guaranteed</p>
                </div>



                <div className='guaranteeDiceItem' >
                    <img src={summary} alt="" />
                    <p>Unlimited changes and support</p>
                </div>

                <div className='guaranteeDiceItem'>
                    <img src={summary} alt="" />
                    <p>0% booking & credit card fees</p>
                </div>



            </div>

            <h2 style={{
                justifyContent: 'left',
                marginLeft: '3%',
                fontStyle: 'italic',
                marginTop: '5%',
                marginBottom: '2%',
                color: '#336699',
                display: 'flex',
                justifyContent: 'center'
            }}>Attractions nearby</h2>

            <div className='attractions'>

                <div className="card" style={{ width: '50%' }}>
                    <img style={{
                        borderRadius: '1.5rem',
                        borderEndStartRadius: '0',
                        borderBottomRightRadius: '0'
                    }} src={test} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <p style={{ fontWeight: 'bold' }} className="card-text">Louvre Museum - Exclusive Guided Tour (Reserved Entry Included)</p>
                        <p>Skip the line access to the Eiffel tower with timed entry during golden hour sunset viewing.</p>
                        <button className='grayLine'></button>
                        <p style={{marginBottom:'0'}}><strong>$28</strong></p>
                        <p style={{ color: 'gray' }}>per person</p>
                    </div>
                </div>

                <div className="card" style={{ width: '50%' }}>
                    <img style={{
                        borderRadius: '1.5rem',
                        borderEndStartRadius: '0',
                        borderBottomRightRadius: '0'
                    }} src={test} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <p style={{ fontWeight: 'bold' }} className="card-text">Versailles Palace and Gardens Tour from Paris.</p>
                        <p>Skip the line access to the Eiffel tower with timed entry during golden hour sunset viewing.</p>
                        <button className='grayLine'></button>
                        <p style={{marginBottom:'0'}}><strong>$28</strong></p>
                        <p style={{ color: 'gray' }}>per person</p>
                    </div>
                </div>

                <div className="card" style={{ width: '50%' }}>
                    <img style={{
                        borderRadius: '1.5rem',
                        borderEndStartRadius: '0',
                        borderBottomRightRadius: '0'
                    }} src={test} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <p style={{ fontWeight: 'bold' }} className="card-text">Montmartre Hidden Gems and Scenic Highlights Walking Tour</p>
                        <p>Skip the line access to the Eiffel tower with timed entry during golden hour sunset viewing.</p>
                        <button className='grayLine'></button>
                        <p style={{marginBottom:'0'}}><strong>$28</strong></p>
                        <p style={{color:'gray'}}>per person</p>
                    </div>
                </div>

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
                width: '80%',
                display: 'flex',
                justifyContent: 'center',
                margin: '0 auto'
            }}>

                <div className="card mb-3" style={{ maxWidth: "540px" }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img style={{ objectFit: 'cover' }} src={test} className="img-fluid w-100 h-100 m-0 rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8 ">
                            <div className="card-body">
                                <h5 className="card-title" style={{ color: '#336699' }}> Palazzo Olivia</h5>
                                <p className="card-text">Versailles is a famous royal palace near Paris, known for its beautiful gardens and grand halls.</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="card mb-3" style={{ maxWidth: "540px" }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img style={{ objectFit: 'cover' }} src={test} className="img-fluid w-100 h-100 m-0 rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8 ">
                            <div className="card-body">
                                <h5 className="card-title" style={{ color: '#336699' }}>Timhotel Opéra Blanche Fontaine</h5>
                                <p className="card-text">Versailles is a famous royal palace near Paris, known for its beautiful gardens and grand halls.</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <div className='divBtn'>
                <button>See More</button>
            </div>

            <div className='footers'>
                <div className="selectorLogos" >
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