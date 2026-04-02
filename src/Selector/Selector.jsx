import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

import { getAllCities } from "../user"

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

    useEffect(()=> {
        getAllCities()
        .then(data=> {
            setCities(data)
            setIsLoading(false)
        })
        .catch(err=> {
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
        <>
            <ul className="nav" style={{ borderBottom: "2px solid gray" }}>
                <div className="selectorLogo">
                    <li><p>Wanderio</p></li>
                    <li><img src={logo} alt="WanderioLogo" title='WanderioLogo' /></li>
                </div>
                <div>
                    <li><img src={avatar} alt="" onClick={() => navigate("/profile")} /></li>
                    <li><img src={cart} alt="" onClick={() => navigate("/cart")} /></li>
                </div>
            </ul>

            <div className="selector">

                <div className="selectorWords">
                    <p> Best Hotels & Accomodation In All Around The World - Biggest Selection & </p>
                    <p>Lowest Prices Guaranteed</p>
                </div>

                <div className="destination">

                    <div className="field">
                        <label style={{ fontWeight: 'bold' }}>Select Destination</label>
                        <select style={{width:'200%'}} value={selectedCity} onChange={(e)=> setSelectedCity(e.target.value)} className="fieldSelector" disabled= {isLoading || error}>
                            <option  value="">{isLoading ? "Cities loading...": "Choose a city"}</option>
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
            <button className="Line" style={{marginTop:'2rem', marginBottom:'2rem'}}></button>
        </>
    )
}