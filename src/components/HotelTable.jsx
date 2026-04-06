export default function TableHotels({ allHotels, onEdit, onDelete, onUploadImage  }) {
    // 1. Eset: Ha az adatok még töltenek (null)
    if (!allHotels) {
        return (
            <div className="text-center my-4">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // 2. Eset: Ha a lekérdezés sikeres, de üres a lista
    if (allHotels.length === 0) {
        return <div className="alert alert-info mt-3">There are no hotels in the database at the moment.</div>;
    }

    // 3. Eset: Van adat, megjelenítjük a táblázatot
    return (
        <div className="table-responsive mt-3">
            <table className="table table-striped table-hover table-bordered align-middle">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Hotel name</th>
                        <th>City ID</th>
                        <th>Hotel address</th>
                        <th>Details</th>
                        <th className="text-center">Images</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allHotels?.map((hotel) => (
                        <tr key={hotel.hotelID}> {/* AZ KÉPED ALAPJÁN ITT hotelID A KULCS */}
                            <td>{hotel.hotelID}</td>
                            <td className="fw-bold">{hotel.name}</td>
                            {/* Jelenleg a cityID-t mutatja. Később a backendben (SQL-ben) érdemes lehet összekapcsolni (JOIN) a cities táblával, hogy a város nevét kapd meg! */}
                            <td>{hotel.cityID}</td>
                            <td>{hotel.address}</td>
                            {/* A details szöveg lehet nagyon hosszú, ezért levágjuk 50 karakternél, hogy szép maradjon a táblázat */}
                            <td>
                                {hotel.details && hotel.details.length > 40
                                    ? hotel.details.substring(0, 40) + '...'
                                    : hotel.details}
                            </td>
                            <td className="text-center">
                                {/* Ha van már képe a hotelnek, jelenítsük meg kis méretben 
                                {hotel.imageUrl && (
                                    <img
                                        src={hotel.imageUrl}
                                        alt={hotel.name}
                                        style={{ width: '80px', height: 'auto', display: 'block', margin: '0 auto 5px' }}
                                    />
                                )}
                                <button
                                    className="btn btn-outline-warning btn-sm"
                                    onClick={() => onUploadImage(hotel)}
                                >
                                    Upload
                                </button>*/}

                                {hotel.hotelImages && hotel.hotelImages.length > 0 ? (
                                    <img
                                        src={hotel.hotelImages[0]}
                                        alt={hotel.name}
                                        style={{ width: '80px', height: 'auto', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <span className="text-muted">No images</span>
                                )}
                                <br />
                                <button
                                    className="btn btn-outline-warning btn-sm mt-2"
                                    onClick={() => onUploadImage(hotel)}   // ← itt onUploadImage-t használunk!
                                >
                                    Upload
                                </button>

                                
                            </td>
                            <td className="text-center" style={{ minWidth: '180px' }}>
                                {/* Szerkesztés gomb */}
                                <button
                                    className="btn btn-outline-info btn-sm me-2"
                                    onClick={() => onEdit(hotel)}
                                >
                                    Szerkesztés
                                </button>

                                {/* Törlés gomb */}
                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => onDelete(hotel)}
                                >
                                    Törlés
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}