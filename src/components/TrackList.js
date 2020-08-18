import React from "react";
import TrackListItem from "./TrackListItem";

function TrackList({ tracks, setPlaybackIndex }) {
    return (
        <div className="trackListContainer overflow-auto">
            <ul className="trackList">
                {tracks.map(track => <li key={track.id}><TrackListItem track={track} setPlaybackIndex={setPlaybackIndex}/></li>)}
            </ul>
        </div>
    );
};

export default TrackList;