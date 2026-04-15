import { useState, useEffect } from 'react';
import FlightTable from '../components/FlightTable'
import { getAdFlights, flightEdit, deleteFlight, getAllCities } from '../user';

export default function FlightManager() {
    const [allFlights, setAllFlights] = useState(null);
    const [cities, setCities] = useState([])
    const [errorAllFlights, setErrorAllFlights] = useState('');

    const [selectedFlight, setSelectedFlight] = useState(null);
    const [showFlightModal, setShowFlightModal] = useState(false);

    const [airlineId, setAirlineId] = useState('')
    const [starting, setStarting] = useState('')
    const [arivval, setArivval] = useState('')
    const [price, setPrice] = useState('')
    const [departureCityID, setDepartureCityID] = useState('')
    const [destinationCityID, setDestinationCityID] = useState('')

    useEffect(() => {
        async function loadFlights() {
            const data = await getAdFlights()
            //console.log(data);

            if (!data.error) setAllFlights(data)
            else setErrorAllFlights(data)
        }

        async function loadCities() {
            try {
                const cityData = await getAllCities()

                if (!cityData.error) setCities(cityData)

            } catch (err) {
                console.error('Hiba a varososk lekeresekor', err)
            }
        }

        loadFlights()
        loadCities()
    }, [])

    async function handleDelete(flight) {
        setErrorAllFlights('')
        if (!window.confirm(`Are you sure you want to delete this hotel: ${flight.flightsId} ?`)) return

        const data = await deleteFlight(flight.flightsId)
        if (data.error) return alert(data.error)

        setAllFlights(prev => prev.filter(x => x.flightsId !== flight.flightsId))
    }

    async function handleEdit(flight) {
        setErrorAllFlights('');
        setSelectedFlight(flight);
        // Beállítjuk az inputok kezdeti értékét is!
        setAirlineId(flight.airlineId);
        setStarting(flight.starting);
        setArivval(flight.arivval);
        setPrice(flight.price);
        setDepartureCityID(flight.departureCityID);
        setDestinationCityID(flight.destinationCityID);
        setShowFlightModal(true);
    }

    async function editFlight(flightsId) {
        setErrorAllFlights('')
        const data = await flightEdit(flightsId, airlineId, starting, arivval, price, departureCityID, destinationCityID)
        try {

            if (data.error) return alert(data.error);

            setAllFlights(prev => prev.map(f => {
                if (f.flightsId === selectedFlight.flightsId) {
                    // Itt a városok nevét is frissítjük a jobb UX érdekében
                    const depCity = cities.find(c => c.cityID === parseInt(departureCityID))?.name || f.depCity;
                    const destCity = cities.find(c => c.cityID === parseInt(destinationCityID))?.name || f.destCity;
                    return { ...f, airlineId, starting, arivval, price, departureCityID, destinationCityID, depCity, destCity };
                }
                return f;
            }));

            setShowFlightModal(false)
            alert('Sikeres modositas')
        } catch (err) {
            alert(data.error)
        }
    }

    return (
        <div>
            <h2>Flight Management</h2>
            {errorAllFlights && <div className="alert alert-danger">{errorAllFlights}</div>}

            <FlightTable allFlights={allFlights} onEdit={handleEdit} onDelete={handleDelete} />

            {/* Modal */}
            {showFlightModal && selectedFlight && (
                <div className="modal d-block" tabIndex='-1' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content p-3">
                            <h5>City Modification</h5>

                            {/* Javítva: city helyett selectedCity! */}

                            <label>Airline: </label>
                            <input type="text" className="form-control mb-2" defaultValue={selectedFlight.airlineId} onChange={(e) => setAirlineId(e.target.value)} />

                            <label>Starting: </label>
                            <input type="text" className="form-control mb-2" defaultValue={selectedFlight.starting} onChange={(e) => setStarting(e.target.value)} />

                            <label>Arivval: </label>
                            <input type="text" className="form-control mb-3" defaultValue={selectedFlight.arivval} onChange={(e) => setArivval(e.target.value)} />

                            <label>Price: </label>
                            <input type="text" className="form-control mb-3" defaultValue={selectedFlight.price} onChange={(e) => setPrice(e.target.value)} />

                            <label>Departure City: </label>
                            <select className='form-select mb-3' value={departureCityID} onChange={(e) => setDepartureCityID(e.target.value)}>
                                <option value="" disabled>Select a departure city</option>
                                {cities.map(city => (
                                    <option key={`dep-${city.cityID}`} value={city.cityID}>
                                        {city.name}
                                    </option>
                                ))}
                            </select>

                            <label>DestinationCity: </label>
                            <select type="text" className="form-select mb-3" value={destinationCityID} onChange={(e) => setDestinationCityID(e.target.value)}>
                            <option value="" disabled>Select a destination city</option>
                            {cities.map(city => (
                                <option key={`dest-${city.cityID}`} value={city.cityID}>
                                    {city.name}
                                </option>
                            ))}
                            </select>

                            <button type="button" className="btn btn-primary mb-2" onClick={() => editFlight(selectedFlight.flightsId)}>Modify</button>
                            <button type="button" className="btn btn-secondary" onClick={() => setShowFlightModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}