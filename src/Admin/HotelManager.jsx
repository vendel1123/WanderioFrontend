import { useState, useEffect } from 'react';
import HotelTable from '../components/HotelTable'
import { deleteHotel, getHotels, hotelEdit, uploadHotelImage } from '../user';

export default function HotelManager() {
    const [allHotels, setAllHotels] = useState(null);
    const [errorAllHotels, setErrorallHotels] = useState('');

    const [selectedHotel, setSelectedHotel] = useState(null);
    const [showHotelModal, setShowHotelModal] = useState(false);

    const [name, setName] = useState('')
    const [cityID, setCityID] = useState('')
    const [details, setDetails] = useState('')
    const [address, setAddress] = useState('')

    useEffect(() => {
        async function loadHotels() {
            const data = await getHotels()
            if (!data.error) setAllHotels(data)
            else setErrorallHotels(data)
        }
        loadHotels()
    }, [])


    async function handleDelete(hotel) {
        setErrorallHotels('')
        if (!window.confirm(`Are you sure you want to delete this hotel: ${hotel.name} ?`)) return
   
        const data = await deleteHotel(hotel.hotelID)
        if (data.error) return alert(data.error)

        setAllHotels(prev => prev.filter(x => x.hotelID !== hotel.hotelID))
    }

    async function handleEdit(hotel) {
        setErrorallHotels('');
        setSelectedHotel(hotel);
        // Beállítjuk az inputok kezdeti értékét is!
        setCityID(hotel.cityID)
        setName(hotel.name);
        setDetails(hotel.details);
        setAddress(hotel.address);
        setShowHotelModal(true);
    }

    async function editHotel(hotelID) {
        setErrorallHotels('')
        const data = await hotelEdit(hotelID, cityID, name, details, address)

        if (data.error) return alert(data.error);
        
        setAllHotels(prev=> prev.map(h=> h.hotelID === hotelID ? {...h, cityID, name, details, address} : h))
        setShowHotelModal(false)
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
            setAllHotels(prev => 
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
            <h2>Hotel Management</h2>
            {errorAllHotels && <div className="alert alert-danger">{errorAllHotels}</div>}

            <HotelTable allHotels={allHotels} onEdit={handleEdit} onDelete={handleDelete} onUploadImage={handleImageUpload} />

            {/* Modal */}
            {showHotelModal && selectedHotel && (
                <div className="modal d-block" tabIndex='-1' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content p-3">
                            <h5>User Modification</h5>

                            {/* Javítva: hotel helyett selectedHotel! */}
                            <label>City ID: </label>
                            <input type="text" className="form-control mb-2" defaultValue={selectedHotel.cityID} onChange={(e) => setName(e.target.value)} />

                            <label>Name: </label>
                            <input type="text" className="form-control mb-2" defaultValue={selectedHotel.name} onChange={(e) => setName(e.target.value)} />

                            <label>Details: </label>
                            <input type="text" className="form-control mb-2" defaultValue={selectedHotel.details} onChange={(e) => setDetails(e.target.value)} />

                            <label>Address: </label>
                            <input type="text" className="form-control mb-3" defaultValue={selectedHotel.address} onChange={(e) => setAddress(e.target.value)} />

                            <button type="button" className="btn btn-primary mb-2" onClick={() => editHotel(selectedHotel.hotelID)}>Modify</button>
                            <button type="button" className="btn btn-secondary" onClick={() => setShowHotelModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}