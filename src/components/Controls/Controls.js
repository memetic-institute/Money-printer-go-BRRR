import { useState } from 'react';
import { shape, bool, number, string, func } from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import {
    faFont,
    faMusic,
    faMusicSlash
} from '@fortawesome/pro-solid-svg-icons';
import Title from '../Title';
import Slider from './Slider';
import Button from './Button';
import TickerForm from './TickerForm';
import TickerSwitch, { tickers } from './TickerSwitch';

const Container = styled.div`
    padding: 1em;
    position: absolute;
    bottom: calc(50px + 1em);
    left: 1em;
    display: flex;
    flex-direction: column;
    z-index: 20;

    @media only screen and (max-width: 1000px) {
        bottom: calc(150px + 1em);
    }

    @media only screen and (max-width: 768px) {
        position: initial;
        margin-top: 40%;
        align-items: center;
    }

    @media only screen and (max-width: 600px) {
        margin-top: 50%;
    }
`;

const flash = keyframes`
  50% {
    opacity: 0;
  }
  100% {
    background-position: 200% center;
  }
`;

const flashingBrrr = css`
    color: #3F3;
    background: linear-gradient(
        to right,
        #3F3 20%,
        #FFF 40%,
        #3F3 60%,
        #FFF 80%
    );
    background-size: 200% auto;
    background-size: 200% auto;
    background-clip: text;
    -webkit-background-clip: text;
    text-fill-color: transparent;
    -webkit-text-fill-color: transparent;
    animation: ${flash} 0.2s linear infinite running;
    text-shadow: 0 0 10px #94F05E;
`;

const Brrr = styled.span`
    color: #000;
    ${({ playbackRate }) => playbackRate >= 90 && flashingBrrr}
`;

const ControlBar = styled.div`
    padding: 0.5em 0;
    max-width: 370px;
    margin-top: 1em;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(15px);
    border-radius: 15px;
`;

const Row = styled.div`
    margin-top: 1em;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const Controls = ({
    handleRateSlider,
    handleChangeSymbol,
    symbol,
    playbackProps: { playbackRate, playing, muted, handleToggleMute },
    ...props
}) => {
    const [symbolModal, setSymbolModal] = useState(false);

    const isCustomSymbol = !tickers.includes(symbol);

    const toggleSymbolModal = () => setSymbolModal(prev => !prev);

    const rs = new Array(Math.floor(playbackRate / 10) + 1).fill(0);

    return (
        <Container {...props}>
            <Title>
                Money printer go&nbsp;
                <Brrr playbackRate={playbackRate}>B{rs.map(() => 'R')}</Brrr>
            </Title>
            <ControlBar>
                <Slider
                    value={playbackRate}
                    min={1}
                    max={100}
                    step={1}
                    onChange={handleRateSlider}
                />
                <Row>
                    <TickerSwitch
                        symbol={symbol}
                        handleChangeSymbol={handleChangeSymbol}
                    />
                    <Button
                        {...(isCustomSymbol
                            ? { label: symbol, active: true }
                            : {
                                  icon: faFont,
                                  ariaLabel: 'Choose custom symbol'
                              })}
                        onClick={toggleSymbolModal}
                    />
                    <Button
                        icon={!playing || muted ? faMusicSlash : faMusic}
                        ariaLabel={muted ? 'Unmute' : 'Mute'}
                        onClick={handleToggleMute}
                    />
                </Row>
            </ControlBar>
            {symbolModal && (
                <TickerForm
                    symbol={symbol}
                    handleToggle={toggleSymbolModal}
                    handleChangeSymbol={handleChangeSymbol}
                />
            )}
        </Container>
    );
};

Controls.propTypes = {
    playbackProps: shape({
        playing: bool.isRequired,
        playbackRate: number.isRequired,
        muted: bool.isRequired,
        handleToggleMute: func.isRequired
    }).isRequired,
    handleRateSlider: func.isRequired,
    handleChangeSymbol: func.isRequired,
    symbol: string.isRequired
};

export default Controls;
