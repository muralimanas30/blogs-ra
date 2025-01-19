import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";

export function LoginHero() {

    const navigate = useNavigate()
    return <div className="full-screen-login-prompt">
        <lottie-player className='home-hero' src="https://lottie.host/5d7fd1fd-153a-44ca-82a8-3608f7c26f7f/43EZv2r2g3.json" background="##fff" style={{
            width: "300px",
            height: "300px"
        }} loop autoplay mode="normal"></lottie-player>
        <div className="login-prompt-box">
            <h2 className="login-heading">Welcome to BlogsRa!</h2>
            <p className="login-text">
                Unlock access to a world of incredible blogs! By logging in, you can:
            </p>
            <ul className="login-benefits">
                <li>Read the latest articles from a variety of categories</li>
                <li>Engage with the community through comments</li>
                <li>Save your favorite blogs and share your own content</li>
                <li>Get personalized blog recommendations</li>
            </ul>
            <button className="custom-button" onClick={() => navigate('/login')}>
                Login
            </button>
        </div>
    </div>;
}
