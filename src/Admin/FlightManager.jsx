import { useState, useEffect } from 'react';
import FlightTable from '../components/FlightTable'
import { getAllCities } from '../user';

export default function CityManager() {
    const [allFlights, setAllFlights] = useState(null);
    const [errorAllFlights, setErrorAllFlights] = useState('');

    const [selectedFlight, setSelectedFlight] = useState(null);
    const [showFlightModal, setShowFlightModal] = useState(false);

    const [airlineId, setAirlineId] = useState('')
    const [starting, setStarting] = useState('')
    const [arivval, setArivval] = useState('')
    const [price, setPrice] = useState('')
    const [departureCity , setDepartureCity ] = useState('')
    const [destinationCity, setDestinationCity] = useState('')

    useEffect(() => {
        async function loadFlights() {
            const data = await getAllCities()
            if (!data.error) setAllFlights(data)
            else setErrorAllFlights(data)
        }
        loadFlights()
    }, [])


    async function handleDelete(flight) {
        setErrorAllFlights('')
        if (!window.confirm(`Are you sure you want to delete this hotel: ${flight.flightsId} ?`)) return
   
        const data = await deleteHotel(flight.flightsId)
        if (data.error) return alert(data.error)

        setAllFlights(prev => prev.filter(x => x.flight !== flight.flightsId))
    }

    async function handleEdit(flight) {
        setErrorAllFlights('');
        setSelectedFlight(flight);
        // Beállítjuk az inputok kezdeti értékét is!
        setAirlineId(flight.airlineId);
        setStarting(flight.starting);
        setArivval(flight.arivval);
        setPrice(flight.price);
        setDepartureCity(flight.departureCity);
        setDestinationCity(flight.setDestinationCity);
        setShowFlightModal(true);
    }

    async function edit(flightsId) {
        setErrorAllFlights('')
        const data = await hotelEdit(flightsId, country, description)

        if (data.error) return alert(data.error);
        
        setAllFlights(prev=> prev.map(f=> f.flightsId === flightsId ? {...f,  country, description} : c))
        setShowFlightModal(false)
        alert('Sikeres modositas')
    }

    // HOZZÁADVA: Az új képfeltöltést kezelő függvény
    async function handleImageUpload(flight) {
        // 1. Létrehozunk egy rejtett file input elemet
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*'; // Csak képeket engedélyezünk

        // 2. Figyeljük, ha a felhasználó kiválasztott egy fájlt
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) {
                return; // Nem választott semmit
            }

            // 3. FormData-t használunk a fájl küldéséhez
            const formData = new FormData();
            formData.append('image', file); // A 'image' kulcsnak meg kell egyeznie a backend oldali multer beállítással!

            // 4. Meghívjuk az API-t a hotel ID-jával és a fájl adataival
            const data = await uploadHotelImage(flight.flightsId, formData);

            if (data.error) {
                return alert(data.error);
            }

            // 5. Sikeres feltöltés után frissítjük a state-et az új kép URL-lel
            setAllFlights(prev => 
                prev.map(f => 
                    f.flightsId === flight.flightsId 
                    ? { ...f, imageUrl: data.imageUrl } // Feltételezzük, hogy a backend a frissített imageUrl-t adja vissza
                    : f
                )
            );
            alert('Kép sikeresen feltöltve!');
        };

        // 6. "Rákattintunk" a rejtett inputra, hogy megnyíljon a fájlválasztó ablak
        input.click();
    }

    return (
        <div>
            <h2>City Management</h2>
            {errorAllFlights && <div className="alert alert-danger">{errorAllFlights}</div>}

            <FlightTable allFlights={allFlights} onEdit={'handleEdit'} onDelete={'handleDelete'} onUploadImage={'handleImageUpload'} />

            {/* Modal */}
            {showFlightModal && selectedFlight && (
                <div className="modal d-block" tabIndex='-1' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
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
                            
                            <label>DepartureCity: </label>
                            <input type="text" className="form-control mb-3" defaultValue={selectedFlight.departureCity} onChange={(e) => setDepartureCity(e.target.value)} />
                            
                            <label>DestinationCity: </label>
                            <input type="text" className="form-control mb-3" defaultValue={selectedFlight.destinationCity} onChange={(e) => setDestinationCity(e.target.value)} />

                            <button type="button" className="btn btn-primary mb-2" onClick={() => edit(selectedFlight.flightsId)}>Modify</button>
                            <button type="button" className="btn btn-secondary" onClick={() => setShowFlightModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}