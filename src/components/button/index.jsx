import React from "react";
import { useNavigate } from "react-router-dom";
import {Button} from "reactstrap";

const LogOutButton = () => {
    const navigate  = useNavigate();

    const logOut = () => {
        navigate("/sign-in");
    };

    return (
        <div style={{marginTop: "20px", marginRight: "20px"}}>
            <Button className="float-right" onClick={logOut}>Sign out</Button>
        </div>
    )
}

export default LogOutButton