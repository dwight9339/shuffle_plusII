import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";

import TrackList from "./TrackList";

function PlaylistInfo({ playlist, token, tracks, playbackIndex, setPlaybackIndex }) {
    if (!playlist) {
        return <h2 className="columnHeader placeHolderText">Please select a playlist</h2>;
    }
    return (
        <div className="playlistInfoContainer">
            <h2 className="columnHeader">{playlist.name}</h2>
            <SpotifyPlayer token={token}
                           uris={tracks.map(track => track.uri)} 
                           name={playlist.name} 
                           styles={{
                               bgColor: "#212121",
                               color: "#b3b3b3",
                               trackNameColor: "white",
                               trackArtistColor: "#b3b3b3",
                               sliderColor: "#1db954",
                               sliderHandleColor: "#121212",
                               sliderTrackBorderRadius: "0.3em"
                           }}
                           className="spotifyPlayer"
                           magnifySliderOnHover
                           offset={playbackIndex}
                           />
            <TrackList tracks={tracks} setPlaybackIndex={setPlaybackIndex} />
        </div>
    );
};

export default PlaylistInfo;