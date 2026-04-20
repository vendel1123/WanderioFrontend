import { useNavigate, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext";

import { getAllCities, whoami } from "../user"

import cart from "../assets/cart.png"
import avatar from "../assets/avatar.png"
import logo from "../assets/world.png"
import tourist from "../assets/tourist.png"
import verified from "../assets/verified.png"
import checklist from "../assets/checklist.png"
import information from "../assets/information.png"


import './Selector.css'

export default function Selector() {

    const navigate = useNavigate()

    const [selectedCity, setSelectedCity] = useState("")

    const [cities, setCities] = useState([])

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const { user } = useAuth();

    const handleAdmin = () => {
        if (!user || user.role !== 'admin') {
            return <Navigate to='/selector' />
        }
        else{
            navigate(`/admin`)
        }
    }

    useEffect(() => {
        getAllCities()
            .then(data => {
                setCities(data)
                setIsLoading(false)
            })
            .catch(err => {
                console.error("Hiba a varosok lekeresekor")
                setError("A varosok listajat nem sikerult betolteni", err)
                setIsLoading(false)
            })
    }, [])

    const handleSearch = () => {
        if (selectedCity) {
            navigate(`/booking/${selectedCity}`)
        } else {
            alert("Please select a destination")
        }

    }

    return (
        <div className="selectorDiv">
            <ul className="selectorLogoNav" style={{ margin: '0' }}>
                <div className="selectorLogo">
                    <li><img src={logo} alt="WanderioLogo" title='WanderioLogo' /></li>
                    <li><p>Wanderio</p></li>
                </div>
                <div>
                    <li><button className="adminBtn" onClick={handleAdmin}>Admin</button></li>
                    <li><img src={avatar} alt="" onClick={() => navigate("/profile")} /></li>
                    <li><img src={cart} alt="" onClick={() => navigate("/cart")} /></li>
                </div>
            </ul>

            <div className="selectorTop">
                <div className="selector">

                    <div className="selectorWords">
                        <p> Best Hotels & Accomodation In All Around The World - Biggest Selection & </p>
                        <p>Lowest Prices Guaranteed</p>
                    </div>

                    <div className="destination">

                        <div className="field">
                            <label style={{ fontWeight: 'bold', }}>Select Destination</label>
                            <select style={{ width: '150%', border: '2px solid lightgray' }} value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="fieldSelector" disabled={isLoading || error}>
                                <option value="">{isLoading ? "Cities loading..." : "Choose a city"}</option>
                                {error && <option disabled>{error}</option>}
                                {!isLoading && !error && cities.map(city => (
                                    <option key={city.cityID} value={city.cityID}>
                                        {city.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button onClick={handleSearch} disabled={!selectedCity}> Search Now</button>
                    </div>

                </div>
                <h3 style={{ color: 'white', fontWeight: 'bold', marginTop: '1rem' }}>Popular destinatins</h3>
                <div className="destinationBottom">

                    <p>Paris</p>
                    <p>Rome</p>
                    <p>Budapest</p>
                    <p>Tokyo</p>

                </div>
            </div>

            <div className="footer">
                <div className="footerDiv">
                    <div>
                        <li><img src={tourist} alt="" /></li>
                        <li>Largest Selection of Travel Services</li>
                    </div>

                    <div>
                        <li><img src={verified} alt="" /></li>
                        <li>Best price Guarantee</li>
                    </div>
                </div>

                <div className="footerDiv">
                    <div>
                        <li><img src={checklist} alt="" /></li>
                        <li>Easy Booking & Cancellation</li>
                    </div>

                    <div>
                        <li><img src={information} alt="" /></li>
                        <li>Most Popular Website around the world</li>
                    </div>
                </div>

            </div>
        </div>
    )
}