export default function HotelOrderTable({hotelOrders, onEdit, onDelete}) {
    if (!hotelOrders) {
        return (
            <div className="text-center my-4">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading....</span>
                </div>
            </div>
        )
    }

    if (hotelOrders.length === 0) {
        return <div className="alert alert-info mt-3">There are no hotel orders.</div>
    }

    return(
        <div className="table-responsive mt-3">
            <table className="table table-striped table-hover table-bordered align-middle">
                <thead className="table-dark">
                    <tr>
                        <th>Order ID</th>
                        <th>User</th>
                        <th>Hotel</th>
                        <th>Room ID</th>
                        <th>Order Date</th>
                        <th>Nights</th>
                        <th>Status</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {hotelOrders?.map((order) => (
                        <tr key={order.orderID}>
                            <td>{order.orderID}</td>
                            <td>{order.username}</td>
                            <td>{order.hotelName}</td>
                            <td>{order.roomId}</td>
                            <td>{new Date(order.date).toLocaleDateString()}</td>
                            <td>{order.day}</td>
                            <td>
                                <span className={`badge ${order.status === 'completed' ? 'bg-success' : order.status === 'pending' ? 'bg-warning text-dark' : 'bg-danger'}`}>
                                    {order.status}
                                </span></td>
                            <td className="text-center" style={{ minWidth: '180px' }}> 
                                <button className="btn btn-outline-info btn-sm me-2" onClick={() => onEdit(order)}>
                                    Edit Status
                                </button>

                                <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(order)}>
                                    Delete 
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}