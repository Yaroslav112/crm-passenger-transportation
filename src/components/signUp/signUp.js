import React from 'react';
import { Form, Button } from 'bootstrap-4-react';
import { FacebookIcon, GoogleIcon, PhoneIcon } from "../../assets/icons";
import { useNavigate } from 'react-router-dom';
import { signInFacebook, signInGoogle } from '../../Auth/Auth';

const admin = "yaroslav0934@gmail.com"

function SignUpComponent({signUpForm, handleSignUpForm, handleSignUp}) {
    const navigate = useNavigate();

    const handleSignInGoogle = (event) => {
        event.preventDefault();
        signInGoogle().then((res) => {
            if (res.user && res.user.email === admin) {
                navigate('/admin-page');
            } else {
                navigate('/home-page');
            }
        });
    };

    const handlePhone = (event) => {
        event.preventDefault();
        navigate('/phone-page');
    };

    const handleSignInFacebook = (event) => {
        event.preventDefault();
        signInFacebook().then((res) => {
            console.log(res.user, 'res.user && res.user.email')
            if (res.user && res.user.email === admin) {
                navigate('/admin-page');
            } else {
                navigate('/admin-page');
            }
        });
    };

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: '5'}}>
            <h2>Sign up</h2>
            <Form>
                <Form.Group>
                    <label htmlFor="inputEmail">Email address</label>
                    <Form.Input
                        label={'Email'}
                        name='email'
                        value={signUpForm.email}
                        onChange={handleSignUpForm}
                        type="email"
                        id="inputEmail"
                        placeholder="Enter email"
                    />
                    <Form.Text text="muted">We'll never share your email with anyone else.</Form.Text>
                </Form.Group>
                <Form.Group>
                    <label htmlFor="inputPassword">Password</label>
                    <Form.Input
                        type="password"
                        id="inputPassword"
                        label={'Password'}
                        name='password'
                        placeholder='Password'
                        value={signUpForm.password}
                        onChange={handleSignUpForm}
                    />
                </Form.Group>
                <Form.Group>
                    <label htmlFor="inputName">Name</label>
                    <Form.Input
                        label={'Name'}
                        name='name'
                        value={signUpForm.name}
                        onChange={handleSignUpForm}
                        type="text"
                        id="inputName"
                        placeholder="Enter name"
                    />
                </Form.Group>
                <Form.Group>
                    <label htmlFor="inputSurname">Surname</label>
                    <Form.Input
                        label={'Surname'}
                        name='surname'
                        value={signUpForm.surname}
                        onChange={handleSignUpForm}
                        type="text"
                        id="inputSurname"
                        placeholder="Enter surname"
                    />
                </Form.Group>
                <Button primary onClick={handleSignUp} type="submit">Submit</Button>
            </Form>
            <p>or sign up with</p>
            <div style={{marginLeft: "10px", display: "flex", width: "140px", justifyContent: "space-around"}}>
                <Button onClick={handleSignInGoogle}>
                    <GoogleIcon />
                </Button>
                <Button onClick={handleSignInFacebook}>
                    <FacebookIcon />
                </Button>
                <Button onClick={handlePhone}>
                    <PhoneIcon />
                </Button>
            </div>
        </div>
    );
}

export default SignUpComponent;
