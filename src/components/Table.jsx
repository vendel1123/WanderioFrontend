import React from 'react';

export default function Table({ allUsers, onEdit, onDelete }) {
    // 1. Eset: Ha az adatok még töltenek (null)
    if (!allUsers) {
        return (
            <div className="text-center my-4">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // 2. Eset: Ha a lekérdezés sikeres, de üres az adatbázis
    if (allUsers.length === 0) {
        return <div className="alert alert-info mt-3">There are no users in the database right now.</div>;
    }

    // 3. Eset: Van adat, megjelenítjük a táblázatot
    return (
        <div className="table-responsive mt-3">
            <table className="table table-striped table-hover table-bordered align-middle">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email address</th>
                        <th>Role </th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers?.map((user) => (
                        <tr key={user.userID}>
                            <td>{user.userID}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                {/* Egy kis extra vizualitás: ha admin, más színű a jelvény */}
                                <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>
                                    {user.role}
                                </span>
                            </td>
                            <td className="text-center">
                                {/* Szerkesztés gomb */}
                                <button 
                                    className="btn btn-outline-info btn-sm me-2" 
                                    onClick={() => onEdit(user)}
                                >
                                    Modify
                                </button>
                                
                                {/* Törlés gomb */}
                                <button 
                                    className="btn btn-outline-danger btn-sm" 
                                    onClick={() => onDelete(user)}
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

