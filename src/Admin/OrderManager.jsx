import { useState, useEffect } from 'react';
import HotelOrderTable from '../components/HotelOrderTable'
import FlightOrderTable from '../components/FlightOrderTable'
import {getHotelOrders, getFlightOrders, deleteHotelOrder, deleteFlightOrder} from '../user'

export default function OrderManager() {
    const [hotelOrders, setHotelOrders] = useState(null)
    const [flightOrders, setFlightOrders] = useState(null)
    const [error, setError] = useState('')

    const [selectedOrder, setSelectedOrder] = useState(null)
    const [orderType, setOrderType] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [newStatus, setNewStatus] = useState('')

    //Adatbetoltes
    useEffect(() => {
        async function loadAllOrders() {
            try {
                const [hotelData, flightData] = await Promise.all([
                    getHotelOrders(),
                    getFlightOrders()
                ])
                if (Array.isArray(hotelData)) setHotelOrders(hotelData)
                else setError(hotelData.error)

                if (Array.isArray(flightData)) setFlightOrders(flightData)
                else setError(flightData.error)

            } catch (err) {
                setError(err.message)
                setHotelOrders([])
                setFlightOrders([])
            }
        }
        loadAllOrders()
    }, [])

    //torles
    async function handleDelete() {
        setError('')
        const id = type === 'hotel' ? order.orderID : order.orderID
        if (!window.confirm(`Biztosan torolni szeretned ezt a rendelest: ID ${id}`)) return
        
        try {
            if (type === 'hotel') {
                await deleteHotelOrder(id)
                setHotelOrders(prev=> prev.filter(o => o.orderID !== id))
            } else {
                await deleteFlightOrder(id)
                setFlightOrders(prev=> prev.filter(o => o.orderID !== id))
            }
        } catch (err) {
            alert(err.error)
        }
    }
    //Szerkeztes
    function handleEdit(order, type) {
        setError('')
        setSelectedOrder(order)
        setOrderType(type)
        setNewStatus(order.status)
        setShowModal(true)
    }

    //statusz mentes
    async function saveOrderStatus() {
        setError('')
        if (!selectedOrder || !newStatus) return       
        const id = selectedOrder.orderID

        try {
            if (orderType === 'hotel') {
                await updateHotelOrderStatus(id,newStatus)
                setHotelOrders(prev=> prev.map(o=> o.orderID === id ? {...o, status: newStatus} : o))
            } else {
                await updateFlightOrderStatus(id, newStatus)
                setFlightOrders(prev=> prev.map(o=> o.orderID === id ? {...o, status: newStatus} : o))
            }
            setShowModal(false)
            alert('Statusz sikeresen modositva!')
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <div>
            <h2>Order Management</h2>
            {error && <div className='alert alert-danger' >{error}</div>}

            <hr />
            <h3>Hotel Orders</h3>
            <HotelOrderTable orders={hotelOrders} onEdit={(order)=> {handleEdit(order, 'hotel')}} onDelete={(order)=> {handleDelete(order, 'hotel')}}/>

            <h3>Flight Orders</h3>
            <FlightOrderTable orders={hotelOrders} onEdit={(order)=> {handleEdit(order, 'flight')}} onDelete={(order)=> {handleDelete(order, 'flight')}}/>

            {showModal && selectedOrder && (
                <div className="modal d-block" tabIndex='-1' style={{ background: 'rgba(0,0,0,0.5'}}>
                    <div className="modal-dialog">
                        <div className="modal-content p-3">
                            <h5>Edit Order Status (ID: {selectedOrder.orderID})</h5>
                            <p><strong>User ID:</strong> {selectedOrder.userID}</p>
                            {orderType === 'hotel' ? (
                                <p><strong>Hotel ID:</strong> {selectedOrder.hotelID}</p>
                            ) : (
                                <p><strong>Airline ID:</strong> {selectedOrder.airlineID}</p>
                            )}

                            <label htmlFor="status-select">Status:</label>
                            <select id="status-select" className='form-select mb-3' value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>

                            <button type='button' className="btn btn-primary mb-2" onClick={saveOrderStatus}>Save Status</button>
                            <button type='button' className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    )

}