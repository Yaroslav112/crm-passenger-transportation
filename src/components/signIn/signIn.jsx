import React, { useState } from 'react';
import { Button, Form } from "bootstrap-4-react";
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../Auth/Auth';

const admin = "yaroslav0934@gmail.com"

const signInFormDefaultValue = {
    email: '',
    password: '',
}

function SignInComponent() {
    const navigate = useNavigate();
    const [signInForm, setSignInForm] = useState(signInFormDefaultValue);

    const handleSignInForm = (event) => {
        setSignInForm({ ...signInForm, [event.target.name]: event.target.value });
    };

    const handleSignIn = (event) => {
        event.preventDefault();
        signIn(signInForm.email, signInForm.password).then((res) => {
            if (res.user && res.user.email === admin) {
                navigate('/admin-page');
            } else {
                navigate('/home-page');
            }
        });
    };

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: '5'}}>
            <h2>Sign in</h2>
            <Form>
                <Form.Group>
                    <label htmlFor="inputEmail">Email address</label>
                    <Form.Input
                        label={'Email'}
                        name='email'
                        type="email"
                        id="inputEmail"
                        placeholder="Enter email"
                        value={signInForm.email}
                        onChange={handleSignInForm}
                    />
                    <Form.Text mx="auto"  text="muted">We'll never share your email with anyone else.</Form.Text>
                </Form.Group>
                <Form.Group>
                    <label htmlFor="inputPassword">Password</label>
                    <Form.Input
                        id="inputPassword"
                        label={'Password'}
                        name='password'
                        type='password'
                        placeholder='Password'
                        value={signInForm.password}
                        onChange={handleSignInForm}
                    />
                </Form.Group>
                <Button onClick={handleSignIn} primary type="submit">Submit</Button>
            </Form>
        </div>
    );
}

export default SignInComponent;
