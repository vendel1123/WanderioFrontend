import { useNavigate } from "react-router-dom"
import { useState } from "react"

import { flight } from '../user.js'

import logo from "../assets/world.png"

import './Flights.css'

export default function Flights() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        airlineId: "",
        starting: "",
        arivval: "",
        price: "",
        departure: "",
        destination: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: <e className="target value"></e>
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    async function fl() {
        try {
            const data = await flight()

            setTimeout(() => navigate('/cart'), 600)

            setFormData({
                airlineId: "",
                starting: "",
                arivval: "",
                price: "",
                departure: "",
                destination: ""
            })
        } catch (err) {
            alert('Ismeretlen hiba:' + err.message)
        }
    }




    return (
        <div style={{maxWidth:"600px", margin:"0 auto"}}>
            <h2>Repülőjegy létrehozása</h2>
            <form onSubmit={handleSubmit}>
        {/* Légitársaság */}
        <select
          name="airlineId"
          value={formData.airlineId}
          onChange={handleChange}
          required
        >
          <option value="">Válassz légitársaságot</option>
          <option value="1">Wizz Air</option>
          <option value="2">Ryanair</option>
          <option value="3">Lufthansa</option>
          <option value="4">KLM</option>
        </select>

        {/* Indulás */}
        <input
          type="datetime-local"
          name="starting"
          value={formData.starting}
          onChange={handleChange}
          required
        />

        {/* Érkezés */}
        <input
          type="datetime-local"
          name="arrival"
          value={formData.arrival}
          onChange={handleChange}
          required
        />

        {/* Ár */}
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Ár"
          required
        />

        {/* Indulási város */}
        <input
          type="text"
          name="departure"
          value={formData.departure}
          onChange={handleChange}
          placeholder="Indulási város"
          required
        />

        {/* Célállomás */}
        <input
          type="text"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          placeholder="Célállomás"
          required
        />

        <button type="submit" onClick={()=> fl()}>🚀 Létrehozás</button>
      </form>



        </div>
    )
}