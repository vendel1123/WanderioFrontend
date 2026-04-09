export default function TableRooms({ allRooms }) {
    // 1. Eset: Ha az adatok még töltenek (null)
    if (!allRooms) {
        return (
            <div className="text-center my-4">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // 2. Eset: Ha a lekérdezés sikeres, de üres a lista
    if (allRooms.length === 0) {
        return <div className="alert alert-info mt-3">There are no rooms in the database at the moment.</div>;
    }

    // 3. Eset: Van adat, megjelenítjük a táblázatot
    return (
        <div className="table-responsive mt-3">
            <table className="table table-striped table-hover table-bordered align-middle">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Hotel</th>
                        <th>Type</th>
                        <th>Available</th>
                        <th>Price</th>
                        <th>Guests</th>
                        <th>Climate</th>
                        <th>Arrival</th>
                        <th>Starting</th>
                        <th>Services</th>
                        <th>Size</th>
                        <th className="text-center">Images</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allRooms?.map((room) => (
                        <tr key={room.roomId}>
                            <td>{room.roomId}</td>
                            <td>{room.hotelID}</td>
                            <td>{room.available}</td>
                            <td>{room.price}</td>
                            <td>{room.guests}</td>
                            <td>{room.climate}</td>
                            <td>{room.arrival}</td>
                            <td>{room.starting}</td>
                            <td>
                                {room.services && room.services.length > 40
                                    ? room.services.substring(0, 40) + '...'
                                    : room.services}
                            </td>
                            <td>{room.size}</td>
                            <td className="text-center">
                                {room.hotelImg && room.hotelImg.length > 0 ? (
                                    <img
                                        src={room.hotelImg}
                                        style={{ width: '80px', height: 'auto', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <span className="text-muted">No images</span>
                                )}
                                <br />
                                <button
                                    className="btn btn-outline-warning btn-sm mt-2"
                                    onClick={() => onUploadImage(room)}   // ← itt onUploadImage-t használunk!
                                >
                                    Upload
                                </button>


                            </td>
                            
                            {/* A description szöveg lehet nagyon hosszú, ezért levágjuk 40 karakternél, hogy szép maradjon a táblázat */}

                            <td className="text-center" style={{ minWidth: '180px' }}>
                                {/* Szerkesztés gomb */}
                                <button
                                    className="btn btn-outline-info btn-sm me-2"
                                    onClick={() => onEdit(room)}
                                >
                                    Modify
                                </button>

                                {/* Törlés gomb */}
                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => onDelete(room)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}