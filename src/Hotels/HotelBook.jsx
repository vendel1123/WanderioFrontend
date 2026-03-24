
import logo from '../assets/world.png'
import test from '../assets/signInImg.jpg'

import './HotelBook.css'

import { useNavigate } from 'react-router-dom'

export default function HotelBook() {

    const navigate = useNavigate()

    return (
        <div className='hotelBookPage'>
            <div className="nav">
                <div className="selectorLogo">
                    <li><p>Wanderio</p></li>
                    <li><img src={logo} alt="WanderioLogo" title='WanderioLogo' /></li>
                </div>
                <button className='back' onClick={() => navigate('/hotels')}>← Back</button>
            </div>

            <h3>Timhotel Opéra Blanche Fontaine</h3>

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

            <div className="about">
                <h5>About this hotel</h5>
                <button className="grayLineH"></button>

                <p>The Timhotel Opéra Blanche Fontaine is located in the heart of Paris, close to the Moulin Rouge, Montmartre and the Sacré-Cœur Basilica. The hotel has a private indoor parking lot</p>
                <p>The guest rooms feature air conditioning, flat-screen TV with satellite channels and free Wi-Fi access. A safe is also provided, and some double rooms are suitable for guests with reduced mobility.</p>
                <p>Breakfast is available at the property. Our staff is dedicated to providing excellent service throughout your stay.</p>
            </div>

            <div className="detail">
                <h5>Room details</h5>
                <button className="grayLineH"></button>

                <div>
                    <p className='grayP'>ROOM Type</p>
                    <p>Double Room</p>
                </div>
                <div>
                    <p className='grayP'>CAPACITY</p>
                    <p>2 Adults</p>
                </div>
                <div>
                    <p className='grayP'>SIZE</p>
                    <p>28 m²</p>
                </div>
                <div>
                    <p className='grayP'>BED TYPE</p>
                    <p>1 King Bed</p>
                </div>
            
            </div>

            <div className="amenities">
                <h5>Amenities</h5>
                <button className="grayLineH"></button>

            </div>
        </div>
    )
}