import { useNavigate } from "react-router-dom"

import logo from "../assets/world.png"
import FlightCard from "../components/FlightCard"

import './Flights.css'

export default function Flights(){

    const navigate = useNavigate()

    return(

        <div className="flightsWhole">
            <div className="selectorLogoes">
                    <li><img src={logo} alt="WanderioLogo" title='WanderioLogo' /></li>
                    <li><p>Wanderio</p></li>
            </div>

            <div className="flightsHeader">
                <input type="text" placeholder="Starting point" />
                <input type="text" placeholder="Arrival point"/>
                <input type="date" />
                <input type="date" />
            </div>

            <div className="result">
            <FlightCard />
            <FlightCard />
            </div>

            <button className="back" onClick={()=> navigate('/booking')}>Back</button>


        </div>
    )
}