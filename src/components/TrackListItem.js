import React from "react";

function TrackListItem({ track, setPlaybackIndex }) {
    return (
        <div className="trackListItemContainer">
            <div>
                <div style={{
                    display: "flex"
                }}>
                    <div className="trackName" onClick={() => setPlaybackIndex(track.index)}>
                        {track.name}
                        <div className="underlineEffect"></div> 
                    </div> 
                </div>
                <div className="artistNames">{track.artists.map(artist => artist.name).join(", ")}</div>
            </div>
        </div>
    );
};

export default TrackListItem;