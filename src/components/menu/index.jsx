import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavbarToggler, Collapse } from 'reactstrap';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase-config';

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [users, setUsers] = useState([]);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await updateDoc(doc(db, 'users', userId), {
                role: newRole
            });

            const updatedUsers = users.map((user) => {
                if (user.id === userId) {
                    return { ...user, role: newRole };
                }
                return user;
            });
            setUsers(updatedUsers);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const getUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'users'));
                const usersData = querySnapshot.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id };
                });
                setUsers(usersData);
            } catch (error) {
                console.error(error);
            }
        };

        getUsers();
    }, []);

    return (
        <>
            <h2  style={{backgroundColor: "#6fa1ff", marginBottom: "0", paddingLeft: "20px"}}>You are Administrator</h2>
            <Navbar className="navbar-light" style={{backgroundColor: "#6fa1ff"}} expand="-xl">
                <NavbarToggler onClick={toggleNavbar} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <ul style={{marginLeft: "50px"}}>
                            {users.map((user) => (
                                <li style={{ width: "20%", borderRadius: "20px", padding: "10px", marginTop: "20px", listStyleType: "none", marginBottom: "10px"}} key={user.id}>
                                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                                         height="250px"
                                         className="card-img-top" alt="user-photo"
                                    />
                                    <div className="card text-white bg-secondary mb-3" style={{maxWidth: "18rem;"}}>
                                        <div className="card-body">
                                            <p style={{ color: 'white' }}>Role: {user?.role}</p>
                                            <p style={{ color: 'white', marginBottom: "0" }}>Name: {user?.first} {user?.last}</p>
                                        </div>
                                        <div style={{marginLeft: "20px", marginBottom: "10px"}}>
                                            <select
                                                className="form-control text-white bg-dark"
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                style={{width: "150px", height: "35px"}}
                                            >
                                                <option value="Driver">Driver</option>
                                                <option value="Passenger">Passenger</option>
                                                <option value="Dispatcher">Dispatcher</option>
                                            </select>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Nav>
                </Collapse>
            </Navbar>
        </>
    );
};

export default HamburgerMenu;
