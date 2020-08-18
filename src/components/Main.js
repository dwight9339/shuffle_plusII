import React, { useState, useEffect } from "react";
import { encode } from "querystring";
import axios from "axios";
import PlaylistList from "./PlaylistList";
import MustHavePremium from "./MustHavePremium";
import PlaylistInfo from "./PlaylistInfo";
import ShuffleControls from "./ShuffleControls";
import LoginPrompt from "./LoginPrompt";

function Main() {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [refreshInterval, setRefreshInterval] = useState();
    const [user, setUser] = useState();
    const [currentPlaylist, setCurrentPlaylist] = useState();
    const [tracks, setTracks] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [playbackIndex, setPlaybackIndex] = useState();

    const getTokens = async ({data, state, verifier}) => {
        if (data.state === state) {
            let params = {
                "client_id": process.env.REACT_APP_CLIENT_ID,
                "grant_type": "authorization_code",
                "code": data.code,
                "redirect_uri": process.env.REACT_APP_REDIRECT_URI.replace(".", "%2E"),
                "code_verifier": verifier,
            }
            let res = await axios({
                method: "post",
                url: "https://accounts.spotify.com/api/token",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: encode(params)
            }).catch(err => console.error(err));

            if (res) {
                getUserInfo(res.data);
            }
        }
    }
    const getUserInfo = async ({ access_token, refresh_token, expires_in }) => {
        setAccessToken(access_token);
        setRefreshToken(refresh_token);
        setRefreshInterval(expires_in - 30);
        let res = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
            "Authorization": "Bearer " + access_token,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
        }).catch(err => console.log(err.message));
        setUser(res.data);
    }
    const updateTokens = async () => {
        let res = await axios({
            method: "post",
            url: "https://accounts.spotify.com/api/token",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: encode({
                refresh_token: await refreshToken,
                client_id: process.env.REACT_APP_CLIENT_ID,
                grant_type: "refresh_token"
            })
        }).catch(err => console.error(err));

        if (res) {
            setAccessToken(res.data.access_token);
            setRefreshToken(res.data.refresh_token);
            setRefreshInterval(res.data.expires_in - 30);
        }
    }
    const updateTracks = trax => {
        let i = 0;
        trax.forEach(track => track["index"] = i++);
        setTracks(trax);
        setPlaybackIndex(0);
    }
    const getTracks = async () => {
        if (!currentPlaylist) return;
        let next = currentPlaylist.tracks.href;
        let trax = [];
        while (next) {
            let res = await axios.get(next, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                }
            }).catch(err => console.error(err.message));
            trax = trax.concat(res.data.items.map(item => item.track));
            next = res.data.next;
        }
        updateTracks(trax);
    }
    const getPlaylists = async () => {
        let res = await axios.get("https://api.spotify.com/v1/me/playlists", {
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).catch(err => console.error(err.message));
        console.log(res.data.items);
        setPlaylists(res.data.items.filter(item => item.owner.id === user.id));
    }

    useEffect(() => {
        getTracks();
    }, [currentPlaylist]);

    useEffect(() => {
        if (refreshInterval !== undefined) {
            let interval = setInterval(() => {
                updateTokens();
            }, refreshInterval * 1000);
        
            return () => clearInterval(interval);  
        }
    }, [accessToken, refreshToken, refreshInterval]);

    if (!user) {
        return <LoginPrompt getTokens={getTokens} />
    }

    if (user.product === "free" || user.prduct === "open") {
        return <MustHavePremium />;
    }

    return (
        <div className="mainWrapper">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <PlaylistList playlists={playlists} getPlaylists={getPlaylists} setCurrentPlaylist={setCurrentPlaylist} />
                    </div>
                    <div className="col d-inline-block">
                        <PlaylistInfo playlist={currentPlaylist} token={accessToken} tracks={tracks} playbackIndex={playbackIndex} setPlaybackIndex={setPlaybackIndex} />
                    </div>
                    <div className="col">
                        <ShuffleControls playlist={currentPlaylist} tracks={tracks} setTracks={updateTracks} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;