export default function TableFlights({ allFlights }) {
    // 1. Eset: Ha az adatok még töltenek (null)
    if (!allFlights) {
        return (
            <div className="text-center my-4">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // 2. Eset: Ha a lekérdezés sikeres, de üres a lista
    if (allFlights.length === 0) {
        return <div className="alert alert-info mt-3">There are no flights in the database at the moment.</div>;
    }

    // 3. Eset: Van adat, megjelenítjük a táblázatot
    return (
        <div className="table-responsive mt-3">
            <table className="table table-striped table-hover table-bordered align-middle">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Airline name</th>
                        <th>Starting</th>
                        <th>Arivval</th>
                        <th>price</th>
                        <th>departureCity</th>
                        <th>destinationCity</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allFlights?.map((flight) => (
                        <tr key={flight.flightsId}>
                            <td>{flight.flightsId}</td>
                            <td>{flight.airlineId}</td>
                            <td>{flight.starting}</td>
                            <td>{flight.arivval}</td>
                            <td>{flight.price}</td>
                            <td>{flight.departureCity}</td>
                            <td>{flight.destinationCity}</td>
                            <td className="text-center" style={{ minWidth: '180px' }}>
                                {/* Szerkesztés gomb */}
                                <button
                                    className="btn btn-outline-info btn-sm me-2"
                                    onClick={() => onEdit(flight)}
                                >
                                    Modify
                                </button>

                                {/* Törlés gomb */}
                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => onDelete(flight)}
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