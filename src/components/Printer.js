import { useState } from 'react';
import { bool, number, func } from 'prop-types';
import styled from 'styled-components';
import FilePlayer from 'react-player/lib/players/FilePlayer';
import Player from './Player';

const Container = styled.div`
    position: relative;
    padding-top: calc(min(77.3%, 100vh - 50px)); /* 773px / 1000px * 100% */
    top: 0;
    left: 25%;
    min-height: 100%;
    ${({ ready }) =>
        !ready &&
        `background: url('print.gif') center center / contain no-repeat #FFF;`}
    z-index: -1;

    @media only screen and (max-width: 768px) {
        top: 275px;
        padding-top: 77.3%;
        left: 0;
    }
`;

const PrinterPlayer = styled(Player)`
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    outline: none;
    ${({ ready }) => !ready && 'opacity: 0;'}

    @media only screen and (max-width: 768px) {
        width: 50%;
    }
`;

const Printer = ({
    playing,
    muted,
    playbackRate,
    handleToggleMute,
    ...props
}) => {
    const [ready, setReady] = useState(true);

    const printRate = Math.max(Math.min(2, playbackRate / 25), 0.08);

    const handleReady = () => setReady(true);
    const handleError = () => setReady(false);

    return (
        <Container ready={ready} {...props}>
            <PrinterPlayer
                url="print.mp4"
                player={FilePlayer}
                play={player => player.play()}
                config={{
                    file: {
                        attributes: {
                            poster: 'print.gif'
                        }
                    }
                }}
                width="100%"
                height="100%"
                playsinline
                playing={playing}
                playbackRate={printRate}
                ready={ready}
                onReady={handleReady}
                onError={handleError}
                onPlay={handleReady}
            />
        </Container>
    );
};

Printer.propTypes = {
    playing: bool.isRequired,
    muted: bool.isRequired,
    playbackRate: number.isRequired,
    handleToggleMute: func.isRequired
};

export default Printer;
