import React, { useEffect } from "react";
import PlaylistListItem from "./PlaylistListItem";

function PlaylistList({ playlists, setCurrentPlaylist, getPlaylists }) { 
    useEffect(() => {
        getPlaylists();
    }, []);

    return (
        <div className="playlistListContainer">
            <div className="columnHeader">
                <h2>Your Playlists</h2>
            </div>
            <div className="playlistRefreshButtonContainer">
                <button className=".playlistRefreshButton" onClick={() => getPlaylists()}>Refresh</button>
            </div>
            <ul className="playlistList">
                {playlists.map(playlist => <li key={playlist.id}><PlaylistListItem playlist={playlist} setCurrentPlaylist={setCurrentPlaylist} /></li>)}
            </ul>
        </div>
    )
}

export default PlaylistList;