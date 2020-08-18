import React from "react";

function PlaylistListItem({ playlist, setCurrentPlaylist }) {
    return (
        <div className="playlistLiContainer" 
            onClick={() => setCurrentPlaylist(playlist)}
            style={{
                display: "flex",
            }} 
        >
            <div className="playlistNameContainer" >
                <div className="playlistName">{playlist.name}</div>
                <div className="underlineEffect"></div>
            </div> 
        </div>
    );
};

export default PlaylistListItem;