import React from "react";
import "./LoginButton.css";

function LoginButton({ buttonText = "Inloggen" }) {
    return (
        <button className="login-button">
            {buttonText}
        </button>
    );
}

export default LoginButton;
