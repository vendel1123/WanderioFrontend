import { useState, useEffect } from 'react';
import CityTable from '../components/CityTable'
import { getAllCities } from '../user';

export default function CityManager() {
    const [allCities, setAllCities] = useState(null);
    const [errorAllCities, setErrorAllCities] = useState('');

    const [selectedCity, setSelectedCity] = useState(null);
    const [showCityModal, setShowCityModal] = useState(false);

    const [name, setName] = useState('')
    const [country, setCountry] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        async function loadCities() {
            const data = await getAllCities()
            if (!data.error) setAllCities(data)
            else setErrorAllCities(data)
        }
        loadCities()
    }, [])


    async function handleDelete(city) {
        setErrorAllCities('')
        if (!window.confirm(`Are you sure you want to delete this hotel: ${city.name} ?`)) return
   
        const data = await deleteHotel(city.cityID)
        if (data.error) return alert(data.error)

        setAllCities(prev => prev.filter(x => x.cityID !== city.cityID))
    }

    async function handleEdit(city) {
        setErrorAllCities('');
        setSelectedCity(city);
        // Beállítjuk az inputok kezdeti értékét is!
        setName(city.name);
        setCountry(city.country);
        setDescription(city.description);
        setShowCityModal(true);
    }

    async function edit(cityID) {
        setErrorAllCities('')
        const data = await hotelEdit(cityID, name, country, description)

        if (data.error) return alert(data.error);
        
        setAllCities(prev=> prev.map(c=> c.cityID === cityID ? {...c, name, country, description} : c))
        setShowCityModal(false)
        alert('Sikeres modositas')
    }

    // HOZZÁADVA: Az új képfeltöltést kezelő függvény
    async function handleImageUpload(hotel) {
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
            const data = await uploadHotelImage(hotel.hotelID, formData);

            if (data.error) {
                return alert(data.error);
            }

            // 5. Sikeres feltöltés után frissítjük a state-et az új kép URL-lel
            setAllCities(prev => 
                prev.map(h => 
                    h.hotelID === hotel.hotelID 
                    ? { ...h, imageUrl: data.imageUrl } // Feltételezzük, hogy a backend a frissített imageUrl-t adja vissza
                    : h
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
            {errorAllCities && <div className="alert alert-danger">{errorAllCities}</div>}

            <CityTable allCities={allCities} onEdit={'handleEdit'} onDelete={'handleDelete'} onUploadImage={'handleImageUpload'} />

            {/* Modal */}
            {showCityModal && selectedCity && (
                <div className="modal d-block" tabIndex='-1' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content p-3">
                            <h5>City Modification</h5>

                            {/* Javítva: city helyett selectedCity! */}
                            
                            <label>Name: </label>
                            <input type="text" className="form-control mb-2" defaultValue={selectedCity.name} onChange={(e) => setName(e.target.value)} />

                            <label>Country: </label>
                            <input type="text" className="form-control mb-2" defaultValue={selectedCity.country} onChange={(e) => setCountry(e.target.value)} />

                            <label>Description: </label>
                            <input type="text" className="form-control mb-3" defaultValue={selectedCity.description} onChange={(e) => setDescription(e.target.value)} />

                            <button type="button" className="btn btn-primary mb-2" onClick={() => 'editHotel(selectedCity.cityID)'}>Modify</button>
                            <button type="button" className="btn btn-secondary" onClick={() => setShowCityModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}