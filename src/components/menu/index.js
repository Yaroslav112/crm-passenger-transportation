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
            <Navbar className="navbar-light" style={{backgroundColor: "#6fa1ff"}} expand="-xl">
                <NavbarToggler onClick={toggleNavbar} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto " navbar>
                        <ul>
                            {users.map((user) => (
                                <li style={{ width: "25%", backgroundColor: "#8b9098", borderRadius: "20px", border: "2px solid white", padding: "10px", marginTop: "20px", listStyleType: "none", marginBottom: "10px"}} key={user.id}>
                                    <p style={{ color: 'white' }}>Ім'я: {user?.first}</p>
                                    <p style={{ color: 'white' }}>Прізвище: {user?.last}</p>
                                    <div >
                                        <p style={{ color: 'white' }}>Роль: {user?.role}</p>
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
