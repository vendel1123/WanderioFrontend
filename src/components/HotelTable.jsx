export function TableHotels({ allHotels, onEdit, onDelete }) {
    // 1. Eset: Ha az adatok még töltenek (null)
    if (!allHotels) {
        return (
            <div className="text-center my-4">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Betöltés...</span>
                </div>
            </div>
        );
    }

    // 2. Eset: Ha a lekérdezés sikeres, de üres a lista
    if (allHotels.length === 0) {
        return <div className="alert alert-info mt-3">Jelenleg nincsenek szállodák az adatbázisban.</div>;
    }

    // 3. Eset: Van adat, megjelenítjük a táblázatot
    return (
        <div className="table-responsive mt-3">
            <table className="table table-striped table-hover table-bordered align-middle">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Szálloda neve</th>
                        <th>Város ID</th>
                        <th>Pontos cím</th>
                        <th>Részletek</th>
                        <th className="text-center">Műveletek</th>
                    </tr>
                </thead>
                <tbody>
                    {allHotels.map((hotel) => (
                        <tr key={hotel.hotelID}> {/* AZ KÉPED ALAPJÁN ITT hotelID A KULCS */}
                            
                            <td>{hotel.hotelID}</td>
                            
                            <td className="fw-bold">{hotel.name}</td>
                            
                            {/* Jelenleg a cityID-t mutatja. Később a backendben (SQL-ben) érdemes lehet összekapcsolni (JOIN) a cities táblával, hogy a város nevét kapd meg! */}
                            <td>{hotel.cityID}</td>
                            
                            <td>{hotel.address}</td>
                            
                            {/* A details szöveg lehet nagyon hosszú, ezért levágjuk 50 karakternél, hogy szép maradjon a táblázat */}
                            <td>
                                {hotel.details && hotel.details.length > 50 
                                    ? hotel.details.substring(0, 50) + '...' 
                                    : hotel.details}
                            </td>

                            <td className="text-center" style={{ minWidth: '180px' }}>
                                {/* Szerkesztés gomb */}
                                <button 
                                    className="btn btn-warning btn-sm me-2" 
                                    onClick={() => onEdit(hotel)}
                                >
                                    Szerkesztés
                                </button>
                                
                                {/* Törlés gomb */}
                                <button 
                                    className="btn btn-danger btn-sm" 
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