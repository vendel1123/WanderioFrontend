import { useNavigate } from "react-router-dom"

import cart from "../src/assets/cart.png"
import avatar from "../src/assets/avatar.png"
import logo from "../src/assets/world.png"
import tourist from "../src/assets/tourist.png"
import verified from "../src/assets/verified.png"
import checklist from "../src/assets/checklist.png"
import information from "../src/assets/information.png"


import './Selector.css'

export default function Selector() {

    const navigate = useNavigate()
    return (
        <div>
            <ul className="nav" style={{borderBottom: "2px solid gray"}}>
                <div className="selectorLogo">
                    <li><p>Wanderio</p></li>
                    <li><img src={logo} alt="WanderioLogo" title='WanderioLogo' /></li>
                </div>
                <div>
                    <li><img src={avatar} alt="" onClick={() => navigate("/avatar")} /></li>
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
                        <label>Select Destination</label>
                        <input type="text" placeholder="France, Paris" />
                    </div>

                    <div className="field">
                        <label> Select dates</label>
                        <input type="date" placeholder="Sep 18" />
                    </div>



                    <button> Search Now</button>
                </div>
            </div>

            <div className="footer">
                    <li><img src={tourist} alt="" /></li>
                    <li>Largest Selection of Travel Services</li>

                    <li><img src={verified} alt="" /></li>
                    <li>Best price Guarantee</li>

                    <li><img src={checklist} alt="" /></li>
                    <li>Easy Booking & Cancellation</li>

                    <li><img src={information} alt="" /></li>
                    <li>Most Popular Website around the world</li>








                
            </div>
        </div>
    )
}