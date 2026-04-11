export default function TableAttraction({ allAttraction, onEdit, onDelete, onUploadImage }) {
    // 1. Eset: Ha az adatok még töltenek (null)
    if (!allAttraction) {
        return (
            <div className="text-center my-4">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // 2. Eset: Ha a lekérdezés sikeres, de üres a lista
    if (allAttraction.length === 0) {
        return <div className="alert alert-info mt-3">There are no attraction in the database at the moment.</div>;
    }

    // 3. Eset: Van adat, megjelenítjük a táblázatot
    return (
        <div className="table-responsive mt-3">
            <table className="table table-striped table-hover table-bordered align-middle">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>City</th>
                        <th>Attracion name</th>
                        <th>Description</th>
                        <th>Address</th>
                        <th>Price</th>
                        <th className="text-center">Images</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allAttraction?.map((attraction) => (
                        <tr key={attraction.attractionID}>
                            <td>{attraction.attractionID}</td>
                            <td>{attraction.cName}</td>
                            <td className="fw-bold">{attraction.name}</td>
                            {/* A description szöveg lehet nagyon hosszú, ezért levágjuk 40 karakternél, hogy szép maradjon a táblázat */}
                            <td>
                                {attraction.description && attraction.description.length > 40
                                    ? attraction.description.substring(0, 40) + '...'
                                    : attraction.description}
                            </td>
                            <td>{attraction.address}</td>
                            <td>{attraction.price}</td>

                            <td className="text-center">
                                {attraction.attractionImages && attraction.attractionImages.length > 0 ? (
                                    <div className="d-flex flex-wrap justify-content-center gap-2">
                                        {/* 3. Végigmegyünk a cityImages tömbön, és minden URL-re létrehozunk egy képet */}
                                        {attraction.attractionImages.map((imageUrl, index) => (
                                            <img
                                                key={index} // Fontos a 'key' prop a listaelemeknél!
                                                src={imageUrl}
                                                alt={`${attraction.name} - kép ${index + 1}`}
                                                style={{
                                                    width: '60px',  // Kisebb méret, hogy több is elférjen
                                                    height: '60px',
                                                    objectFit: 'cover', // Levágja a képet, hogy kitöltse a négyzetet
                                                    borderRadius: '4px' // Lekerekített sarkok a szebb kinézetért
                                                }}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <span className="text-muted">No images</span>
                                )}
                                <br />
                                <button
                                    className="btn btn-outline-warning btn-sm mt-2"
                                    onClick={() => onUploadImage(attraction)}   // ← itt onUploadImage-t használunk!
                                >
                                    Upload
                                </button>


                            </td>
                            <td className="text-center" style={{ minWidth: '180px' }}>
                                {/* Szerkesztés gomb */}
                                <button
                                    className="btn btn-outline-info btn-sm me-2"
                                    onClick={() => onEdit(attraction)}
                                >
                                    Modify
                                </button>

                                {/* Törlés gomb */}
                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => onDelete(attraction)}
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