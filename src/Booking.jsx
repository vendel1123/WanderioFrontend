import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import './Booking.css'


import cart from "../src/assets/cart.png"
import avatar from "../src/assets/avatar.png"
import logo from "../src/assets/world.png"

import information from "./assets/BookingImgs/information.png"

import test from '../src/assets/signInImg.jpg'

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
                    <li style={{ borderRight: "solid 2px grey", }}><h3 style={{ marginRight: "0.5rem", marginTop: '10px' }}>Description</h3></li>
                    <li style={{ borderRight: "solid 2px grey", }}><h3 style={{ marginRight: "0.5rem", marginTop: '10px' }}>Guide</h3></li>
                </div>
            </ul>

            <h1>Paris</h1>
            <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                        <img src={test} className="d-block w-100 m-0" alt="..." />
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <img src={logo} className="d-block w-100 m-0" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={test} className="d-block w-100 m-0" alt="..." />
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

            <div>
                <div className='description'>
                    <img src={information} alt="" />
                    <h2>Description</h2>
                </div>
                <div>

                </div>
            </div>

        </div>
    )
}