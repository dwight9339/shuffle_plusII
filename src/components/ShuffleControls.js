import React, { useState } from "react";
import Shuffles from "../utils/shuffles";
import BiasList from "./BiasList";

function ShuffleControls({ playlist, tracks, setTracks }) {
    const [shuffleType, setShuffleType] = useState("random");
    const [shuffleParam, setShuffleParam] = useState("artist");
    const [biasOptions, setBiasOptions] = useState({});
    const spreadParams = (
        <div className="optionSetContainer">
            <label htmlFor="spreadParam" className="paramSelectLabel" >Spread Parameter</label>
            <select id="spreadParam" className="paramSelect" onChange={e => setShuffleParam(e.target.value)} >
                <option title="Spread by artist" value="artist">Artist</option>
                <option title="Spread by album" value="album">Album</option>
            </select>
        </div>
    );
    const biasParams = (
        <div className="optionSetContainer">
            <label className="paramSelectLabel" htmlFor="biasParam">Bias Parameter</label> 
            <select id="biasParam" className="paramSelect" onChange={e => setShuffleParam(e.target.value)} >
                <option title="Apply bias by artist" value="artist">Artist</option>
                <option title="Apply bias by album" value="album">Album</option>
                <option title="Apply bias to individual tracks" value="trackName">Track Name</option>
            </select>
        </div>
    );
    const updateBiasOptions = (name, weight) => {
        let opts = biasOptions;
        opts[name] = weight;
        setBiasOptions(opts);
    }
    const shuffle = () => {
        console.log(biasOptions);
        switch (shuffleType) {
            case "random":
                setTracks(Shuffles.uniform(tracks));
                break;
            case "spread":
                setTracks(Shuffles.spread(tracks, shuffleParam));
                break;
            case "biased":
                setTracks(Shuffles.biased(tracks, shuffleParam, biasOptions));
                break;
            default:
                break;
        }
    }

    return (
        <div className="shuffleControlsContainer">
            <div className="columnHeader">
                <h2>Shuffle Controls</h2>
            </div>
            <form>
                <div className="optionSetContainer">
                    <label htmlFor="shuffleType">Shuffle Type</label> 
                    <select id="shuffleType" onChange={e => setShuffleType(e.target.value)}>
                        <option title="A uniformly random shuffle" value="random">Random</option>
                        <option title="Speads tracks with the same shuffle param as far as possible" value="spread">Spread</option>
                        <option title="Apply weight values to shuffle params. Tracks with higher weights have a higher chance of appearing toward the front of the list" 
                                value="biased">Biased</option>
                    </select>
                </div>
                {shuffleType === "random" ? null : (shuffleType === "spread" ? spreadParams : biasParams)}
                {shuffleType === "biased" ? <BiasList tracks={tracks}
                                                      playlist={playlist} 
                                                      shuffleParam={shuffleParam} 
                                                      biasOptions={biasOptions} 
                                                      setBiasOptions={setBiasOptions} 
                                                      updateBiasOptions={updateBiasOptions} /> : null}
            </form>
            <button onClick={() => shuffle()}>Shuffle</button>
        </div>
    );
};

export default ShuffleControls;