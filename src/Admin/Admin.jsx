import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import UsersManager from "./UserManager";
import HotelManager from "./HotelManager";
import CityManager from "./CityManager";
import RoomManager from "./RoomManager";
import FlightManager from "./FlightManager";
import AttractionManager from './AttractionManager'

import './Admin.css'


export default function Admin() {
    const { user, loading, onLogout } = useAuth();

    // Állapot, ami tárolja, melyik táblázatot látjuk éppen (alapból a felhasználókat)
    const [activeTab, setActiveTab] = useState('users');

    if (loading) {
        return (
            <div className="container py-5">
                <div className="spinner-border text-danger"></div>
            </div>
        );
    }

    if (!user || user.role !== 'admin') {
        return <Navigate to='/' />
    }

    return (
        <div className="container py-4">

            {/* Fejléc NavBar nélkül, egy egyszerű kijelentkezés gombbal */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Admin panel</h1>
                <button className="btn btn-danger" onClick={onLogout}>Logout</button>
            </div>

            {/* Menü gombok a táblázatok közötti váltáshoz */}
            <div className="d-flex justify-content-center gap-2 mb-4 border-bottom pb-3">
                <button
                    className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setActiveTab('users')}
                >
                    Users
                </button>
                <button
                    className={`btn ${activeTab === 'hotels' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setActiveTab('hotels')}
                >
                    Hotels
                </button>

                <button
                    className={`btn ${activeTab === 'cities' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setActiveTab('cities')}
                >
                    Cities
                </button>
                <button
                    className={`btn ${activeTab === 'attractions' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setActiveTab('attractions')}
                >
                    Attractions
                </button>
                <button
                    className={`btn ${activeTab === 'rooms' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setActiveTab('rooms')}
                >
                    Rooms
                </button>
                <button
                    className={`btn ${activeTab === 'orders' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setActiveTab('orders')}
                >
                    Orders
                </button>
                <button
                    className={`btn ${activeTab === 'flights' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setActiveTab('flights')}
                >
                    Flights
                </button>
            </div>

            {/* Az éppen kiválasztott komponens (táblázat + modal) megjelenítése */}
            {activeTab === 'users' && <UsersManager />}
            {activeTab === 'hotels' && <HotelManager />}
            {activeTab === 'cities' && <CityManager />}
            {activeTab === 'rooms' && <RoomManager />}
            {activeTab === 'flights' && <FlightManager />}
            {activeTab === 'attractions' && <AttractionManager />}
            {/* {activeTab === 'orders' && <OrdersManager />} 
            {activeTab === 'categories' && <CategoriesManager />}*/}

        </div>
    );
}