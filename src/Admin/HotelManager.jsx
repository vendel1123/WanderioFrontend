import { useState, useEffect } from 'react';
import Table from '../components/Table';
import { getHotels } from '../user';

export default function HotelsManager() {
    const [allHotels, setAllHotels] = useState(null);
    const [errorAllHotels, setErrorallHotels] = useState('');

    const [selectedHotel, setSelectedHotel] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [address, setAddress] = useState('')

    useEffect(() => {
        async function loadHotels() {
            const data = await getHotels()
            if (!data.error) setAllHotels(data)
            else setErrorallHotels(data)
        }
        loadHotels()
    }, [setAllHotels])


    return (
        <div>
            <h2>Hotel Management</h2>
            {errorAllHotels && <div className="alert alert-danger">{errorAllHotels}</div>}

            <Table allHotels={allHotels} onEdit={handleEdit} onDelete={handleDelete} />

            {/* Modal */}
            {showModal && selectedHotel && (
                <div className="modal d-block" tabIndex='-1' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content p-3">
                            <h5>User Modification</h5>

                            {/* Javítva: hotel helyett selectedHotel! */}
                            <label>Name: </label>
                            <input type="text" className="form-control mb-2" defaultValue={selectedHotel.name} onChange={(e) => setName(e.target.value)} />

                            <label>Details: </label>
                            <input type="text" className="form-control mb-2" defaultValue={selectedHotel.details} onChange={(e) => setDetails(e.target.value)} />

                            <label>Address: </label>
                            <input type="text" className="form-control mb-3" defaultValue={selectedHotel.address} onChange={(e) => setAddress(e.target.value)} />

                            <button type="button" className="btn btn-primary mb-2" onClick={() => editUser(selectedHotel.hotelID)}>Modify</button>
                            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}