import { useState, useEffect } from 'react';
import Table from '../components/Table'; 
import { getAllUsers, deleteUser, userEdit } from '../user'; 

export default function UsersManager() {
    const [allUsers, setAllUsers] = useState(null);
    const [errorAllUsers, setErrorAllUsers] = useState('');
    
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    useEffect(()=> {
        async function loadUsers() {
            const data = await getAllUsers();
            if (!data.error) setAllUsers(data);
            else setErrorAllUsers(data.error);
        }
        loadUsers();
    }, [setAllUsers]);

    async function handleDelete(user) {
        setErrorAllUsers('');
        if (!window.confirm(`Biztosan torolni akarod a ${user.username} nevu felhasznalot?`)) return;

        const data = await deleteUser(user.userID);
        if (data.error) return alert(data.error); // Javítva: adta.error kell ide

        setAllUsers(prev => prev.filter(x=> x.userID !== user.userID));
    }

    async function handleEdit(user) {
        setErrorAllUsers('');
        setSelectedUser(user);
        // Beállítjuk az inputok kezdeti értékét is!
        setUsername(user.username);
        setEmail(user.email);
        setRole(user.role);
        setShowModal(true);
    }

    async function editUser(userID) {
        setErrorAllUsers('');
        const data = await userEdit(userID, username, email, role);
        
        if (data.error) return alert(data.error);

        // Opcionális: frissítheted az allUsers statet is itt, hogy azonnal látszódjon a táblázatban
        setAllUsers(prev => prev.map(u => u.userID === userID ? { ...u, username, email, role } : u));
        
        setShowModal(false);
        alert('Sikeres modositas');
    }

    return (
        <div>
            <h2>User Management</h2>
            {errorAllUsers && <div className="alert alert-danger">{errorAllUsers}</div>}
            
            <Table allUsers={allUsers} onEdit={handleEdit} onDelete={handleDelete} />

            {/* Modal */}
            {showModal && selectedUser && (
                <div className="modal d-block" tabIndex='-1' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content p-3">
                            <h5>User Modification</h5>
                            
                            {/* Javítva: user helyett selectedUser! */}
                            <label>Username: </label>
                            <input type="text" className="form-control mb-2" defaultValue={selectedUser.username} onChange={(e) => setUsername(e.target.value)} />

                            <label>Email: </label>
                            <input type="email" className="form-control mb-2" defaultValue={selectedUser.email} onChange={(e) => setEmail(e.target.value)} />

                            <label>Role: </label>
                            <input type="text" className="form-control mb-3" defaultValue={selectedUser.role} onChange={(e) => setRole(e.target.value)} />

                            <button type="button" className="btn btn-primary mb-2" onClick={()=> editUser(selectedUser.userID)}>Modify</button>
                            <button type="button" className="btn btn-secondary" onClick={()=> setShowModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}