import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes, Link, useNavigate} from 'react-router-dom';
import HomePage from './homePage/HomePage';
import SignIn from './signIn/signIn';
import SignUp from './signUp/signUp';
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import AdminPage from "./adminPage";
import { signUp } from "../Auth/Auth";
import SignUpPhone from "./phonePage/signUpPhone";

const defaultFormValue = {
    name: '',
    surname: '',
    email: '',
    password: '',
};

const MainComponent = () => {
    const [signUpForm, setSignUpForm] = useState(defaultFormValue);
    const [isRegistrationCompleted, setIsRegistrationCompleted] = useState(false);

    const handleSignUpForm = (event) => {
        setSignUpForm({ ...signUpForm, [event.target.name]: event.target.value });
    };

    const handleSignUp = async (event) => {
        event.preventDefault();
        signUp(signUpForm.email, signUpForm.password, signUpForm.name, signUpForm.surname).then((res) => {
            if (res.user && res.user.email) {
                setIsRegistrationCompleted(true); // Встановлення флагу про завершення реєстрації
                // navigate('/home-page');
            }
        });
    };

    // console.log(signUpForm, 'firstName')
    useEffect(() => {
        if (isRegistrationCompleted) {
            async function fetchData() {
                try {
                    const docRef = await addDoc(collection(db, 'users'), {
                        first: signUpForm.name,
                        last: signUpForm.surname,
                        // born: 1999
                    });
                    console.log(docRef, 'docRef');
                    console.log('Document written with ID: ', docRef.id);
                } catch (e) {
                    console.error('Error adding document: ', e);
                }
            }
            fetchData();
        }
    }, [isRegistrationCompleted]);

    return (
        <div>
            <Router>
                <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
                    <div w="25"  id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link  className="nav-link text-white bg-dark rounded" to="/sign-in">
                                    Sign In
                                </Link>
                            </li>
                            <li className="nav-item" style={{marginLeft: "10px"}}>
                                <Link className="nav-link text-white bg-dark rounded" to="/sign-up">
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Routes>
                    <Route path="/phone-page" element={<SignUpPhone />}/>
                    <Route path="/home-page" element={<HomePage />}/>
                    <Route path="/admin-page" element={<AdminPage />}/>
                    <Route path="/sign-in" element={<SignIn />}/>
                    <Route path="/sign-up" element={
                        <SignUp
                            signUpForm={signUpForm}
                            handleSignUpForm={handleSignUpForm}
                            handleSignUp={handleSignUp}
                        />}
                    />
                </Routes>
            </Router>
        </div>
    );
};

export default MainComponent;
