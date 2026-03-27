import { useState, useEffect } from "react";
import { getAllUsers } from "../user";
import { useAuth } from "../context/AuthContext";
import Table from "../components/Table";
import logo from "../assets/world.png"
import './Admin.css'

export default function Admin() {
    const { user, onLogut } = useAuth()

    const [allUser, setAllUser] = useState(null)
    const [allOrders, setAllOrders] = useState(null)
    const [allHotels, setAllHotels] = useState(null)
    const [allTickets, setAllTickets] = useState(null)
    
    const [activeTab, setActiveTab] = useState('users') // 👈 Aktív tab

    useEffect(() => {
        async function loadUsers() {
            const data = await getAllUsers()
            if (!data.error) {
                setAllUser(data)
            }
        }
        loadUsers()
    }, [])

    // 👇 Oszlop konfigurációk különböző táblákhoz
    const userColumns = [
        { header: 'ID', accessor: 'userID' },
        { header: 'Username', accessor: 'username' },
        { header: 'Email', accessor: 'email' },
        { header: 'Role', accessor: 'role' },
    ]

    const orderColumns = [
        { header: 'Order ID', accessor: 'orderID' },
        { header: 'User', accessor: 'userName' },
        { header: 'Total', accessor: 'total' },
        { header: 'Status', accessor: 'status' },
    ]

    const hotelColumns = [
        { header: 'Hotel ID', accessor: 'hotelID' },
        { header: 'City ID', accessor: 'cityID' },
        { header: 'Name', accessor: 'name' },
        { header: 'Details', accessor: 'details' },
        { header: 'Address', accessor: 'address' },
    ]

    const ticketColumns = [
        { header: 'Flights ID', accessor: 'flightsId' },
        { header: 'Airline ID', accessor: 'airlineId' },
        { header: 'Starting time', accessor: 'starting' },
        { header: 'Arrival time', accessor: 'arivval' },
        { header: 'Departure City ID', accessor: 'departureCityID' },
        { header: 'Destination City ID', accessor: 'destinationCityID' },
    ]

    // 👇 Akciók konfigurációja
    const actions = [
        {
            buttonClass: 'btn btn-sm btn-outline-info px-4',
            content: 'Szerkesztés',
            onClick: (item) => handleEdit(item)
        },
        {
            buttonClass: 'btn btn-sm btn-outline-danger px-4',
            content: 'Törlés',
            onClick: (item) => handleDelete(item)
        }
    ]

    const handleEdit = (item) => {
        console.log('Edit:', item)
    }

    const handleDelete = (item) => {
        console.log('Delete:', item)
    }

    // 👇 Renderelés a kiválasztott tab alapján
    const renderTable = () => {
        switch(activeTab) {
            case 'users':
                return <Table data={allUser} columns={userColumns} actions={actions} />
            case 'orders':
                return <Table data={allOrders} columns={orderColumns} actions={actions} />
            case 'hotels':
                return <Table data={allHotels} columns={hotelColumns} actions={actions} />
            case 'tickets':
                return <Table data={allTickets} columns={ticketColumns} actions={actions} />
            default:
                return null
        }
    }

    return (
        <div>
            <div className="admin">
                <div className='signUpLog'>
                    <img src={logo} alt="WanderioLogo" />
                    <p>Wanderio</p>
                </div>
                
                <div className="adminNav">
                    <button 
                        className={activeTab === 'users' ? 'active' : ''}
                        onClick={() => setActiveTab('users')}
                    >
                        Users
                    </button>
                    <button 
                        className={activeTab === 'orders' ? 'active' : ''}
                        onClick={() => setActiveTab('orders')}
                    >
                        Orders
                    </button>
                    <button 
                        className={activeTab === 'hotels' ? 'active' : ''}
                        onClick={() => setActiveTab('hotels')}
                    >
                        Hotels
                    </button>
                    <button 
                        className={activeTab === 'tickets' ? 'active' : ''}
                        onClick={() => setActiveTab('tickets')}
                    >
                        Tickets
                    </button>
                </div>

                <div className="adminTable">
                    {renderTable()}
                </div>
            </div>
        </div>
    )
}