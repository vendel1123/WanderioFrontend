export default function TableCities({ allCities }) {
    // 1. Eset: Ha az adatok még töltenek (null)
    if (!allCities) {
        return (
            <div className="text-center my-4">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // 2. Eset: Ha a lekérdezés sikeres, de üres a lista
    if (allCities.length === 0) {
        return <div className="alert alert-info mt-3">There are no cities in the database at the moment.</div>;
    }

    // 3. Eset: Van adat, megjelenítjük a táblázatot
    return (
        <div className="table-responsive mt-3">
            <table className="table table-striped table-hover table-bordered align-middle">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>City name</th>
                        <th>Country</th>
                        <th>Description</th>
                        <th className="text-center">Images</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allCities?.map((city) => (
                        <tr key={city.cityID}>
                            <td>{city.cityID}</td>
                            <td className="fw-bold">{city.name}</td>
                            <td>{city.country}</td>
                            {/* A description szöveg lehet nagyon hosszú, ezért levágjuk 40 karakternél, hogy szép maradjon a táblázat */}
                            <td>
                                {city.description && city.description.length > 40
                                    ? city.description.substring(0, 40) + '...'
                                    : city.description}
                            </td>
                             <td className="text-center"> 
                                {city.hotelImg && city.hotelImg.length > 0 ? (
                                    <img
                                        src={city.hotelImg}
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
                                    onClick={() => onEdit(city)}
                                >
                                    Modify
                                </button>

                                {/* Törlés gomb */}
                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => onDelete(city)}
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