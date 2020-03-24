import React, { useEffect, useRef } from 'react';
import { func, bool, number } from 'prop-types';

const Player = ({ player: ReactPlayer, playing, play, ready, ...props }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (playing && ref && ref.current && ref.current.getInternalPlayer())
            play(ref.current.getInternalPlayer());
    });

    return (
        <ReactPlayer
            ref={ref}
            loop
            tabIndex="-1"
            playsinline
            playing={playing}
            {...props}
        />
    );
};

Player.propTypes = {
    player: func.isRequired,
    playing: bool,
    muted: bool,
    playbackRate: number,
    play: func.isRequired,
    ready: bool
};

Player.defaultProps = {
    playing: true,
    muted: true,
    playbackRate: 1,
    ready: true
};

export default Player;
