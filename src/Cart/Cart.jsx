
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import logo from "../assets/world.png"
import verified from "../assets/verified.png"
import card from "../assets/money.png"
import lock from "../assets/lock.png"
import test from "../assets/signUpimg.jpg"

import './Cart.css'

export default function Cart() {

    const navigate = useNavigate()

    const [showPayment, setShowPayment] = useState(false)

    const [section, setSection] = useState("payment")

    return (
        <div className="cart">
            <div className='signUpLog'>
                <img src={logo} alt="WanderioLogo" title='WanderioLogo' style={{width:'3rem', height:'3rem'}} />
                <p>Wanderio</p>
            </div>

            <div className="cartNavbar">
                <button className={section === "payment" ? "activeTab" : ""} onClick={() => setSection("payment")}>Payment</button>
                <button className={section === "flights" ? "activeTab" : ""} onClick={() => setSection("flights")}>Flights</button>
                <button className={section === "hotels" ? "activeTab" : ""} onClick={() => setSection("hotels")}>Hotels</button>

            </div>

            <div className="foot">
                <h2>Complete your reservation</h2>

                <div className="Cartfooter">
                    <li><img src={verified} alt="" /></li>
                    <li>All taxes inculded</li>

                    <li><img src={lock} alt="" /></li>
                    <li>Secure payments</li>

                    <li><img src={card} alt="" /></li>
                    <li>No credit card fees</li>

                    <li><img src={verified} alt="" /></li>
                    <li>Best price guarantee</li>
                </div>
            </div>

            <div className="details">

                {section === "payment" && (
                    <>
                        <div>
                            <h3 style={{
                                textAlign: 'center',
                                color: '#336699',
                                fontWeight: 'bold'
                            }}>Your Shopping Cart</h3>
                            <div className="paymentwhite">
                                <div className="payment">
                                    <div className="name">
                                        <img src={test} alt="" style={{
                                            height: '80px',
                                            width: '80px',
                                            borderRadius: '1rem',
                                            margin:'0'
                                        }} />
                                        <div className="nameDiv">
                                            <p style={{ fontWeight: 'bold' }}>Versailles Palace</p>
                                            <p style={{ color: 'gray' }}>Hotel • Paris</p>
                                        </div>
                                    </div>

                                    <div className="paymentDivBtn">
                                        <p style={{ fontWeight: 'bold' }}>$17</p>
                                        <button className="paymentButton" >Remove</button>
                                    </div>
                                </div>

                                <div className="payment">
                                    <div className="name">
                                        <img src={test} alt="" style={{
                                            height: '80px',
                                            width: '80px',
                                            borderRadius: '1rem',
                                            margin:'0'
                                        }} />
                                        <div className="nameDiv">
                                            <p style={{ fontWeight: 'bold' }}>Versailles Palace</p>
                                            <p style={{ color: 'gray' }}>Hotel • Paris</p>
                                        </div>
                                    </div>

                                    <div className="paymentDivBtn">
                                        <p style={{ fontWeight: 'bold' }}>$17</p>
                                        <button className="paymentButton" >Remove</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div >

                            {showPayment && (
                                <div className="paymentOverlay">
                                    <div className="paymentDt">
                                        <div className="adat">
                                            <input type="text" id="kartyaSzam" name="kartyaSzam" placeholder="Kártyaszám" />
                                        </div>

                                        <div className="adat">
                                            <input type="text" id="kartyaNev" name="kartyaNev" placeholder="Kártyabirtokos neve" />
                                        </div>

                                        <div id="kettozes">
                                            <div className="adat">
                                                <input type="text" id="cvc" name="cvc" placeholder="CVC/CCV Kód" />
                                            </div>
                                            <div className="adat">
                                                <input type="datetime" id="lejarat" name="lejarat" placeholder="HH/ÉÉ" />
                                            </div>
                                        </div>

                                        <div>
                                            <input type="checkbox" id="kartyaMentese" name="kartyaMentese" />
                                            <label htmlFor="kartyaMentese">Kártya mentése a könnyebb fizetéshez</label>
                                        </div>
                                        <button type="button" id="gomb" className="paymentBtn" onClick={() => navigate('/selector')}>Purchase</button>

                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {section === "flights" && (
                    <>
                        <div>
                            <h3 style={{
                                textAlign: 'center',
                                color: '#336699',
                                fontWeight: 'bold'
                            }}>Your Shopping Cart</h3>
                            <div className="paymentwhite">



                                <div className="payment">
                                    <div className="name">
                                        <img src={test} alt="" style={{
                                            height: '80px',
                                            width: '80px',
                                            borderRadius: '1rem'
                                        }} />
                                        <div className="nameDiv">
                                            <p style={{ fontWeight: 'bold' }}>Versailles Palace</p>
                                            <p style={{ color: 'gray' }}>Hotel • Paris</p>
                                        </div>
                                    </div>

                                    <div className="paymentDivBtn">
                                        <p style={{ fontWeight: 'bold' }}>$17</p>
                                        <button className="paymentButton" >Remove</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div >

                            {showPayment && (
                                <div className="paymentOverlay">
                                    <div className="paymentDt">
                                        <div className="adat">
                                            <input type="text" id="kartyaSzam" name="kartyaSzam" placeholder="Kártyaszám" />
                                        </div>

                                        <div className="adat">
                                            <input type="text" id="kartyaNev" name="kartyaNev" placeholder="Kártyabirtokos neve" />
                                        </div>

                                        <div id="kettozes">
                                            <div className="adat">
                                                <input type="text" id="cvc" name="cvc" placeholder="CVC/CCV Kód" />
                                            </div>
                                            <div className="adat">
                                                <input type="datetime" id="lejarat" name="lejarat" placeholder="HH/ÉÉ" />
                                            </div>
                                        </div>

                                        <div>
                                            <input type="checkbox" id="kartyaMentese" name="kartyaMentese" />
                                            <label htmlFor="kartyaMentese">Kártya mentése a könnyebb fizetéshez</label>
                                        </div>
                                        <button type="button" id="gomb" className="paymentBtn" onClick={() => navigate('/selector')}>Purchase</button>

                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {section === "hotels" && (
                    <>
                        <div>
                            <h3 style={{
                                textAlign: 'center',
                                color: '#336699',
                                fontWeight: 'bold'
                            }}>Your Shopping Cart</h3>
                            <div className="paymentwhite">
                                <div className="payment">
                                    <div className="name">
                                        <img src={test} alt="" style={{
                                            height: '80px',
                                            width: '80px',
                                            borderRadius: '1rem'
                                        }} />
                                        <div className="nameDiv">
                                            <p style={{ fontWeight: 'bold' }}>Versailles Palace</p>
                                            <p style={{ color: 'gray' }}>Hotel • Paris</p>
                                        </div>
                                    </div>

                                    <div className="paymentDivBtn">
                                        <p style={{ fontWeight: 'bold' }}>$17</p>
                                        <button className="paymentButton" >Remove</button>
                                    </div>
                                </div>

                                <div className="payment">
                                    <div className="name">
                                        <img src={test} alt="" style={{
                                            height: '80px',
                                            width: '80px',
                                            borderRadius: '1rem'
                                        }} />
                                        <div className="nameDiv">
                                            <p style={{ fontWeight: 'bold' }}>Versailles Palace</p>
                                            <p style={{ color: 'gray' }}>Hotel • Paris</p>
                                        </div>
                                    </div>

                                    <div className="paymentDivBtn">
                                        <p style={{ fontWeight: 'bold' }}>$17</p>
                                        <button className="paymentButton" >Remove</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div >

                            {showPayment && (
                                <div className="paymentOverlay">
                                    <div className="paymentDt">
                                        <div className="adat">
                                            <input type="text" id="kartyaSzam" name="kartyaSzam" placeholder="Kártyaszám" />
                                        </div>

                                        <div className="adat">
                                            <input type="text" id="kartyaNev" name="kartyaNev" placeholder="Kártyabirtokos neve" />
                                        </div>

                                        <div id="kettozes">
                                            <div className="adat">
                                                <input type="text" id="cvc" name="cvc" placeholder="CVC/CCV Kód" />
                                            </div>
                                            <div className="adat">
                                                <input type="datetime" id="lejarat" name="lejarat" placeholder="HH/ÉÉ" />
                                            </div>
                                        </div>

                                        <div>
                                            <input type="checkbox" id="kartyaMentese" name="kartyaMentese" />
                                            <label htmlFor="kartyaMentese">Kártya mentése a könnyebb fizetéshez</label>
                                        </div>
                                        <button type="button" id="gomb" className="paymentBtn" onClick={() => navigate('/selector')}>Purchase</button>

                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}

            </div>


            <div className="bottomButtons">
                <div>
                    <p>
                        Total <strong style={{ fontSize: '1.5rem' }}>17</strong> USD
                    </p>
                </div>
                <button className="purchaseBtn" onClick={() => setShowPayment(true)}>
                    Purchase
                </button>

                <button className="backBtn" onClick={() => navigate("/Selector")}>
                    Back
                </button>
            </div>

            <button className="grayLine"></button>

            <div className="link">
                <p style={{
                    color: '#A8A8A8',
                    marginRight: '0.5rem'
                }}>24/7 customer support</p>
                <a style={{ color: '#A8A8A8' }} href="">
                    info@wanderio.com</a>
            </div>

        </div>
    )
}