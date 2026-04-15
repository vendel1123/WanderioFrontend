import { useNavigate } from "react-router-dom"
import { useState } from "react"

import { searchFlights, bookFlight } from '../user.js'

import letter from "../assets/letter-i.png"
import logo from "../assets/world.png"

import './Flights.css'

export default function Flights() {

  const navigate = useNavigate()

  const [hiba, setHiba] = useState('')
  const [uzenet, setUzenet] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const [formData, setFormData] = useState({
    departure: "",
    destination: "",
    date: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    setHiba('')
    setUzenet('')
    setSearchResults([])
    try {
      const data = await searchFlights(formData.departure, formData.destination, formData.date)

      if (data.error) {
        setHiba(data.error)
      } else {
        setSearchResults(data)
      }
    } catch (err) {
      setHiba('Hiba a kereses soran' + err.message)
    }
  }

  const handleBooking = async (selectedFlight) => {
    setHiba('');
    setUzenet('');

    try {
      // Meghívjuk az új 'bookFlight' API függvényt a kiválasztott járat adataival
      console.log("Foglalásra küldött adatok:", selectedFlight);
      const bookingData = await bookFlight(selectedFlight);

      if (bookingData.error) {
        setHiba(bookingData.error);
      } else {
        setUzenet(bookingData.message);
        // Átirányítás csak sikeres foglalás után
        setTimeout(() => navigate('/cart'), 1500);
      }
    } catch (err) {
      setHiba("Hiba a foglalás során: " + err.message);
    }
  }

  return (
    <div className="fullscreen">
      <div className="selectorLogoss">
        <li><img src={logo} alt="WanderioLogo" title='WanderioLogo' /></li>
        <li><p>Wanderio</p></li>

      </div>
      <div className="flightDiv">
        <h2 style={{
          margin: '0 auto',
          fontStyle: 'italic',
          color: 'white',
          fontWeight: 'bold'

        }}>Search a plane ticket</h2>
        <form onSubmit={handleSearch} >


          <select
            name="departure"
            value={formData.departure}
            onChange={handleChange}
            required
          >
            <option value="">Choose your departure city</option>
            <option value="1">Budapest</option>
            <option value="2">Paris</option>
            <option value="3">Rome</option>
            <option value="4">Berlin</option>
            <option value="5">Barcelona</option>
            <option value="6">Toyko</option>
          </select>

          {/* Célállomás */}
          <select
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          >
            <option value="">Choose your destination</option>
            <option value="1">Budapest</option>
            <option value="2">Paris</option>
            <option value="3">Rome</option>
            <option value="4">Berlin</option>
            <option value="5">Barcelona</option>
            <option value="6">Toyko</option>
          </select>

          {/* Indulás */}
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          {hiba && <div className='alert alert-danger'>{hiba}</div>}
          {uzenet && <div className='alert alert-success'>{uzenet}</div>}

          <button type="submit" >Search</button>
        </form>

        <div className="search-results" >
          {searchResults.length > 0 && <h3 style={{
            margin: '1rem auto',
            fontStyle: 'italic',
            color: 'white',
            fontWeight: 'bold'
          }}>Available Flights:</h3>}
          {searchResults.map(flight => (
            <div key={flight.id} className="flight-option">
              <div className="flight-details">
                <p><strong>{flight.airlineName}</strong></p>
                <p>{new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} → {new Date(flight.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              <div className="flight-booking">
                <p className="price">${flight.price}</p>
                <button onClick={() => handleBooking(flight)}>Select</button>
              </div>
            </div>
          ))}
        </div>

      </div>

      <div className="warning">
        <img src={letter} alt="information" style={{
          marginBottom: '0rem',
          marginRight: '0.5rem',
          height: '2rem'
        }} />
        <p>Please ensure that all your travel documents, including a valid passport and any required visas, are in order and meet the entry requirements of your destination country. Be advised that any subsequent modifications to your booking may incur additional service fees and fare differences, subject to the specific terms and conditions of the operating airline.</p>
      </div>

    </div>
  )
}