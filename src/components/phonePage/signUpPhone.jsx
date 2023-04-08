import React, { useState } from 'react';
import { Button, Form } from "bootstrap-4-react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase-config";
// import {useNavigate} from "react-router-dom";

function SignUpPhone() {
    const [phoneNumber, setPhoneNumber] = useState("+380")
    const [expandForm, setExpandForm] = useState(false)
    const [OTP, setOTP] = useState('')
    console.log(OTP, 'OTP')
    console.log(phoneNumber, 'phoneNumber')
    // const navigate = useNavigate()

    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
            'size': 'invisible',
            'callback': (response) => {
            }
        }, auth);
    }

    const requestOTP = (e) => {
        e.preventDefault()
        if (phoneNumber.length > 12) {
            setExpandForm(true)
            generateRecaptcha();
            const appVerifier =  window.recaptchaVerifier;
            signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then(confirmationResult => {
                window.confirmationResult = confirmationResult;
                console.log(confirmationResult, 'confirmationResult')

            }).catch((e) => {
                console.log(e, 'eeeeeeeeeeeeeeerorrrrr')
            })
        }

    }

    const verifyOTP = (e) => {
        const otp = e.target.value;
        setOTP(otp)

        if (otp.length === 6) {
            const confirmationResult = window.confirmationResult;

            confirmationResult.confirm(otp).then((result) => {
                const user = result.user;
            }).catch((e) => {
                console.log(e, 'eeeeeeeeeenother')
            })
        }
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: '5'}}>
            <h2>Sign up with phone</h2>
            <Form onSubmit={requestOTP}>
                <div>
                    <label htmlFor="phoneNumberInput" className="form-label">phone number</label>
                    <div  >
                        <input type="tel" className="form-control" id="phoneNumberInput" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} aria-describedby="emailHelp"/>
                        {expandForm === false?
                            <button type="submit" className="btn btn-primary">get otp</button>
                        : null}
                    </div>
                </div>
                {expandForm === true?
                    <>
                        <div className="mb-3">
                            <label htmlFor="otpInput" className="form-label">OTP</label>
                            <input type="number" className="form-control" value={OTP} onChange={verifyOTP} id="otpInput" />
                            <div id="otpHelp" className="form-text">enter code</div>
                        </div>
                    </>
                 : null}
                <div id="recaptcha-container"></div>
                <Button primary type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default SignUpPhone;
