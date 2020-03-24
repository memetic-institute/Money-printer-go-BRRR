import { bool, number, func } from 'prop-types';
import styled from 'styled-components';
import YouTubePlayer from 'react-player/lib/players/YouTube';
import Player from './Player';

const MusicPlayer = styled(Player)`
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    opacity: 0;
    pointer-events: none;
    z-index: -2;
`;

const Music = ({ playbackRate, handleToggleMute, ...props }) => (
    <MusicPlayer
        url="https://www.youtube.com/watch?v=fTFxE32onKs"
        player={YouTubePlayer}
        play={player => player && player.playVideo && player.playVideo()}
        playbackRate={Math.max(playbackRate / 25, 0.25)}
        config={{
            youtube: {
                playerVars: {
                    start: 0,
                    controls: 0,
                    disablekb: 1,
                    modestbranding: 1
                }
            }
        }}
        width="0"
        height="0"
        {...props}
    />
);

Music.propTypes = {
    playing: bool.isRequired,
    playbackRate: number.isRequired,
    muted: bool.isRequired,
    handleToggleMute: func.isRequired
};

export default Music;
