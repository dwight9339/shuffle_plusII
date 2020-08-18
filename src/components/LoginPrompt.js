import React from "react";
import SpotifyLogin from "./SpotifyLogin";

function LoginPrompt({ getTokens }) {
    let error = "";

    return (
        <div className="loginPromptContainer">
            <div className="loginPrompt">
                <div className="promptText">
                   <h1>Welcome to Shuffle+!</h1>
                    <h2>Please login to your Spotify account</h2> 
                </div>
                {error ? <p>{error}</p>: null}
                <SpotifyLogin clientId={process.env.REACT_APP_CLIENT_ID}
                    redirectUri={process.env.REACT_APP_REDIRECT_URI}
                    scope={process.env.REACT_APP_SCOPE} 
                    onSuccess={res => getTokens(res)}
                    onFailure={err => console.log(err.message)} 
                    className="loginButton"
                />
            </div>
        </div>
    )
};

export default LoginPrompt;