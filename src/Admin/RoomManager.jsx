import { useState, useEffect } from 'react';
import RoomTable from '../components/RoomTable'
import { deleteHotel, getAdHotels, hotelEdit, uploadHotelImage } from '../user';

export default function RoomManager() {
    const [allRooms, setAllRooms] = useState(null);
    const [errorAllRooms, setErrorallRooms] = useState('');

    const [selectedRoom, setSelectedRoom] = useState(null);
    const [showRoomModal, setShowRoomModal] = useState(false);

    const [hotelID, setHotelID] = useState('')
    const [typeId, setTypeId] = useState('')
    const [available, setAvailable] = useState('')
    const [price, setPrice] = useState('')
    const [guests, setGuests] = useState('')
    const [climate, setClimate] = useState('')
    const [arrival, setArrival] = useState('')
    const [starting, setStarting] = useState('')
    const [services, setServices] = useState('')
    const [size, setSize] = useState('')

    useEffect(() => {
        async function loadRooms() {
            const data = await getAdHotels()
            if (!data.error) setAllRooms(data)
            else setErrorallRooms(data)
        }
        loadRooms()
    }, [])


    async function handleDelete(room) {
        setErrorallRooms('')
        if (!window.confirm(`Are you sure you want to delete this hotel: ${room.roomId} ?`)) return
   
        const data = await delete(room.roomId)
        if (data.error) return alert(data.error)

        setAllRooms(prev => prev.filter(x => x.roomId !== room.roomId))
    }

    async function handleEdit(room) {
        setErrorallRooms('');
        setSelectedRoom(room);
        // Beállítjuk az inputok kezdeti értékét is!
        setHotelID(room.hotelID)
        setTypeId(room.typeId);
        setAvailable(room.available);
        setPrice(room.price);
        setGuests(room.guests);
        setClimate(room.climate);
        setArrival(room.arrival);
        setStarting(room.starting);
        setServices(room.services);
        setSize(room.size);
        setShowRoomModal(true);
    }

    async function editHotel(roomId) {
        setErrorallRooms('')
        const data = await hotelEdit(roomId, hotelID, cityID, details, address)

        if (data.error) return alert(data.error);
        
        setAllRooms(prev=> prev.map(r=> r.roomId === roomId ? {...r, cityID, details, address} : h))
        setShowRoomModal(false)
        alert('Sikeres modositas')
    }

    // HOZZÁADVA: Az új képfeltöltést kezelő függvény
    async function handleImageUpload(room) {
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
            const data = await uploadHotelImage(room.roomId, formData);

            if (data.error) {
                return alert(data.error);
            }

            // 5. Sikeres feltöltés után frissítjük a state-et az új kép URL-lel
            setAllRooms(prev => 
                prev.map(r => 
                    r.roomId === room.roomId 
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
            {errorAllRooms && <div className="alert alert-danger">{errorAllRooms}</div>}

            <RoomTable allRooms={allRooms} onEdit={'handleEdit'} onDelete={'handleDelete'} onUploadImage={'handleImageUpload'} />

            {/* Modal */}
            {showRoomModal && selectedRoom && (
                <div className="modal d-block" tabIndex='-1' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content p-3">
                            <h5>Room Modification</h5>

                            <label>Hotel ID: </label>
                            <input type="text" className="form-control mb-2" defaultValue={selectedRoom.hotelID} onChange={(e) => setHotelID(e.target.value)} />
                            
                            <label>Type: </label>
                            <input type="text" className="form-control mb-2" defaultValue={selectedRoom.typeId} onChange={(e) => setTypeId(e.target.value)} />

                            <label>Available: </label>
                            <input type="text" className="form-control mb-2" defaultValue={selectedRoom.available} onChange={(e) => setAvailable(e.target.value)} />

                            <label>Price: </label>
                            <input type="text" className="form-control mb-2" defaultValue={selectedRoom.price} onChange={(e) => setPrice(e.target.value)} />

                            <label>Guests: </label>
                            <input type="text" className="form-control mb-3" defaultValue={selectedRoom.guests} onChange={(e) => setGuests(e.target.value)} />
                            
                            <label>Climate: </label>
                            <input type="text" className="form-control mb-3" defaultValue={selectedRoom.climate} onChange={(e) => setClimate(e.target.value)} />
                            
                            <label>Arrival: </label>
                            <input type="text" className="form-control mb-3" defaultValue={selectedRoom.arrival} onChange={(e) => setArrival(e.target.value)} />
                            
                            <label>Starting: </label>
                            <input type="text" className="form-control mb-3" defaultValue={selectedRoom.starting} onChange={(e) => setStarting(e.target.value)} />
                            
                            <label>Services: </label>
                            <input type="text" className="form-control mb-3" defaultValue={selectedRoom.services} onChange={(e) => setServices(e.target.value)} />
                            
                            <label>Size: </label>
                            <input type="text" className="form-control mb-3" defaultValue={selectedRoom.size} onChange={(e) => setSize(e.target.value)} />

                            <button type="button" className="btn btn-primary mb-2" onClick={() => edit(selectedRoom.roomId)}>Modify</button>
                            <button type="button" className="btn btn-secondary" onClick={() => setShowRoomModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}