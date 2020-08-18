import React, { useState, useEffect } from "react";

function BiasList({ tracks, playlist, shuffleParam, biasOptions, setBiasOptions, updateBiasOptions }) {
    const [currentPlaylist, setCurrentPlaylist] = useState();
    const [currentShuffleParam, setCurrentShuffleParam] = useState();
    const getOptions = () => {
        let opts = {};
        switch (shuffleParam) {
            case "artist":
                tracks.forEach(track => opts[track.artists[0].name] = 1);
                break;
            case "album":
                tracks.forEach(track => opts[track.album.name] = 1);
                break;
            case "trackName":
                tracks.forEach(track => opts[track.name] = 1);
                break;
            default:
                break;
        }
        setBiasOptions(opts);
        console.log("Resetting bias options");
    }

    useEffect(() => {
        if (currentPlaylist !== playlist || currentShuffleParam !== shuffleParam) {
            getOptions();  
            setCurrentPlaylist(playlist);
            setCurrentShuffleParam(shuffleParam);
        }
         
    }, [tracks, shuffleParam]);

    return (
        <div className="optionsListContainer">
            {Object.keys(biasOptions).map(opt => (
                <div className="weightSelector" key={opt}>
                    <label htmlFor={opt + "Weight"} className="sliderLabel">{opt}</label>
                    <input type="range" 
                           min="1" 
                           max="10" 
                           defaultValue={biasOptions[opt]} 
                           onChange={e => updateBiasOptions(opt, parseInt(e.target.value, 10))} 
                           className="weightSlider" 
                           id={opt + "Weight"}></input>
                </div>
            ))}
        </div>
    )
}

export default BiasList;