import { useNavigate } from "react-router-dom"
import { useState } from "react"

import { flight } from '../user.js'

import logo from "../assets/world.png"

import './Flights.css'

export default function Flights() {

  const navigate = useNavigate()

  const [hiba, setHiba] = useState('')
  const [uzenet, setUzenet] = useState('')

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
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fl()
  }

  async function fl() {
    setHiba('')
    setUzenet('')
    try {
      const data = await flight(formData)
      if (data.error) {
        setHiba(data.error)
      }
      setUzenet(data.message)
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
      alert('Hiba:' + err.message)
    }
  }

  return (
    <div className="fullscreen">
      <div className="flightDiv">
        <h2 style={{
          margin: '0 auto',
          fontStyle: 'italic',
          color: 'white',
          fontWeight: 'bold'

        }}>Create a plane ticket</h2>
        <form onSubmit={handleSubmit}>
          {/* Légitársaság */}
          <select
            name="airlineId"
            value={formData.airlineId}
            onChange={handleChange}
            required
          >
            <option value="">Choose an airlines</option>
            <option value="1">Wizz Air</option>
            <option value="2">Ryanair</option>
            <option value="3">Lufthansa</option>
            <option value="4">KLM</option>
            <option value="5">Emirates</option>
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
            name="arivval"
            value={formData.arivval}
            onChange={handleChange}
            required
          />

          {/* Ár */}
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price (USD)"
            required
          />

          {/* Indulási város */}
          <input
            type="text"
            name="departure"
            value={formData.departure}
            onChange={handleChange}
            placeholder="Departure city"
            required
          />

          {/* Célállomás */}
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="Destination city"
            required
          />

          {hiba && <div className='alert alert-danger'>{hiba}</div>}
          {uzenet && <div className='alert alert-success'>{uzenet}</div>}

          <button type="submit" >Create</button>
        </form>

      </div>

      <div className="warning">

        <p>Please ensure that all your travel documents, including a valid passport and any required visas, are in order and meet the entry requirements of your destination country. Be advised that any subsequent modifications to your booking may incur additional service fees and fare differences, subject to the specific terms and conditions of the operating airline.</p>
      </div>

    </div>
  )
}