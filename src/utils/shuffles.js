class Shuffles {
    static getUnique(tracks, param) {
        let uniq = {};

        tracks.forEach(track => {
            if (!uniq[track[param]]) {
                uniq[track[param]] = true;
            }
        });
        return Object.keys(uniq);
    };

    static mergeArrays(arrays) {
        let merged = [];

        for (let i = 0; i < arrays[0].length; i++) {
            for (let j = 0; j < arrays.length; j++) {
                if (arrays[j][i]) merged.push(arrays[j][i]);
            }
        }

        return merged;
    };

    static simplifyTracks(tracks) {
        let index = 0;
        return tracks.map(track => {
            return {
                trackName: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                index: index++
            }
        });
    };

    static uniform(tracks) {
        if (!tracks) return;

        let trax = [...tracks];
        for (let i = trax.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));

            [trax[i], trax[j]] = [trax[j], trax[i]];
        }
        return trax;
    };

    static spread(tracks, shuffleParam) {
        if (!tracks) return;
        
        let trax = this.simplifyTracks(tracks);
        let arrays = this.getUnique(trax, shuffleParam).map(param => trax.filter(track => track[shuffleParam] === param));
        let maxSize = Math.max(...arrays.map(array => array.length));

        arrays.forEach(array => {
            if (array.length < maxSize) {
                for (let i = 0; i < maxSize - array.length; i++) {
                    array.push("");
                }
            }
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
        
                [array[i], array[j]] = [array[j], array[i]];
            }
        });
        let merged = this.mergeArrays(arrays);
        return merged.map(track => tracks[track.index]);
    }

    static biased(tracks, shuffleParam, biasOptions) {
        if (!tracks) return;

        let trax = this.simplifyTracks(tracks);
        trax.forEach(track => track.weight = biasOptions[track[shuffleParam]]);
        trax.sort((t1, t2) => Math.random() * t2.weight - Math.random() * t1.weight);
        return trax.map(track => tracks[track.index]);
    }    
}

export default Shuffles;