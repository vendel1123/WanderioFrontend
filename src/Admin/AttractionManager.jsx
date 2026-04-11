import { useState, useEffect } from 'react';
import AttractionTable from '../components/AttractionTable'
import { getAllAttraction, attractionEdit, deleteAttraction, uploadAttractionImage } from '../user';

export default function AttractionManager() {
    const [allAttraction, setAllAttraction] = useState(null);
    const [errorAllAttraction, setErrorAllAttraction] = useState('');

    const [selectedAttraction, setSelectedAttraction] = useState(null);
    const [showAttractionModal, setShowAttractionModal] = useState(false);

    const [cityID, setCityID] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [price, setPrice] = useState('')

    useEffect(() => {
        async function loadAttractions() {
            const data = await getAllAttraction()
            console.log('kepek adatok:', data);

            if (!data.error) setAllAttraction(data)
            else setErrorAllAttraction(data)
        }
        loadAttractions()
    }, [])


    async function handleDelete(attraction) {
        setErrorAllAttraction('')
        if (!window.confirm(`Are you sure you want to delete this city: ${attraction.name} ?`)) return

        const data = await deleteAttraction(attraction.attractionID)
        if (data.error) return alert(data.error)

        setAllAttraction(prev => prev.filter(x => x.attractionID !== attraction.attractionID))
    }

    async function handleEdit(attraction) {
        setErrorAllAttraction('');
        setSelectedAttraction(attraction);
        // Beállítjuk az inputok kezdeti értékét is!
        setCityID(attraction.cityID)
        setName(attraction.name);
        setAddress(attraction.address);
        setDescription(attraction.description);
        setPrice(attraction.price)
        setShowAttractionModal(true);
    }

    async function editAttraction(attractionID) {
        setErrorAllAttraction('')
        const data = await attractionEdit(attractionID, cityID, name, address, description, price)

        if (data.error) return alert(data.error);

        setAllAttraction(prev => prev.map(a => a.attractionID === attractionID ? { ...a, cityID, name, address, description, price } : a))
        setShowAttractionModal(false)
        alert('Sikeres modositas')
    }

    // HOZZÁADVA: Az új képfeltöltést kezelő függvény
    async function handleImageUpload(attraction) {
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

            // 4. Meghívjuk az API-t a city ID-jával és a fájl adataival
            const data = await uploadAttractionImage(attraction.attractionID, formData);

            if (data.error) {
                return alert(data.error);
            }

            if (data.attractionImages && data.attractionImages.length > 0) {
                const newImageUrls = data.attractionImages;

                setAllAttraction(prev =>
                    prev.map(a => {
                        if (a.attractionID === attraction.attractionID) {
                            // Biztosítjuk, hogy a meglévő képek tömbje létezzen, ha nem, üres tömböt használunk.
                            const existingImages = Array.isArray(a.attractionImages) ? a.attractionImages : [];
                            // A meglévő 'cityImages' tömbhöz hozzáfűzzük az újakat.
                            const updatedImages = [...existingImages, ...newImageUrls];
                            // A 'cityImages' mezőt frissítjük az új, bővített tömbbel.
                            return { ...a, attractionImages: updatedImages };
                        }
                        return a;
                    })
                );
                alert(`${newImageUrls.length} kép sikeresen feltöltve!`);
            } else {
                alert('Hiba: A szerver nem küldte vissza a kép URL-jét.');
            }
        };

        // 6. "Rákattintunk" a rejtett inputra, hogy megnyíljon a fájlválasztó ablak
        input.click();
    }

    return (
        <div>
            <h2>Attraction Management</h2>
            {errorAllAttraction && <div className="alert alert-danger">{errorAllAttraction}</div>}

            <AttractionTable allAttraction={allAttraction} onEdit={handleEdit} onDelete={handleDelete} onUploadImage={handleImageUpload} />

            {/* Modal */}
            {showAttractionModal && selectedAttraction && (
                <div className="modal d-block" tabIndex='-1' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content p-3">
                            <h5>City Modification</h5>

                            {/* Javítva: city helyett selectedCity! */}

                            <label>City: </label>
                            <input type="text" className="form-control mb-2" defaultValue={selectedAttraction.cityID} onChange={(e) => setCityID(e.target.value)} />

                            <label>Name: </label>
                            <input type="text" className="form-control mb-2" defaultValue={selectedAttraction.name} onChange={(e) => setName(e.target.value)} />

                            <label> Address: </label>
                            <input type="text" className="form-control mb-2" defaultValue={selectedAttraction.address} onChange={(e) => setAddress(e.target.value)} />

                            <label>Description: </label>
                            <input type="text" className="form-control mb-3" defaultValue={selectedAttraction.description} onChange={(e) => setDescription(e.target.value)} />

                            <label>Price: </label>
                            <input type="text" className="form-control mb-3" defaultValue={selectedAttraction.price} onChange={(e) => setPrice(e.target.value)} />

                            <button type="button" className="btn btn-primary mb-2" onClick={() => editAttraction(selectedAttraction.attractionID)}>Modify</button>
                            <button type="button" className="btn btn-secondary" onClick={() => setShowAttractionModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}