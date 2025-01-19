// src/components/CustomError/CustomError.jsx
import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import './CustomError.css';

const CustomError = () => {
    const navigate = useNavigate();
    const error = useRouteError();

    const handleRedirect = () => {
        navigate('/');
    };

    return (
        <div className="custom-error-container">
            <div className="custom-error-hero">
                <div className="custom-error-hero-box">
                    <p>A simple refresh might fix things? try again</p>
                    <img
                        src="https://res.cloudinary.com/dddmjpmci/image/upload/v1736002631/mbjxmqnemcr61u1dl7uj.gif"
                        alt="Error Illustration"
                        className="custom-error-hero-image"
                    />
                    <p className="custom-error-hero-text">Oh My God, is it an Error again!!</p>
                </div>
                <div className="custom-error-hero-box">
                    <h1 className="custom-error-title">{error?.status || 500}</h1>
                    <p className="custom-error-message">
                        {error?.statusText || "An unexpected error occurred. Please try again later."}
                    </p>
                    {error?.data && (
                        <pre className="custom-error-details">
                            {JSON.stringify(error.data, null, 2)}
                        </pre>
                    )}
                    <button className="custom-error-btn" onClick={handleRedirect}>
                        Go to Home
                    </button>
                </div>
                <div className="custom-error-hero-box">

                    <img
                        src="https://res.cloudinary.com/dddmjpmci/image/upload/v1736002621/yj4bxmuexd55v4qmzdsc.gif"
                        alt="Error Illustration"
                        className="custom-error-hero-image"
                    />
                    <p className="custom-error-hero-text">Report it in the contact us, we are working on it</p>
                </div>

                <div className="custom-error-hero-box">
                    <img
                        src="https://res.cloudinary.com/dddmjpmci/image/upload/v1736002633/qmu0q7g35xuyi1pmwzds.gif"
                        alt="Error Illustration"
                        className="custom-error-hero-image"
                    />
                    <p className="custom-error-hero-text">Oh Wait, Thank you for using our platform!!</p>
                </div>
            </div>

        </div>
    );
};

export default CustomError;