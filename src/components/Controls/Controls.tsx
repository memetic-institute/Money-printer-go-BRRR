import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import {
  faFont,
  faMusic,
  faMusicSlash,
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
  color: #3f3;
  background: linear-gradient(to right, #3f3 20%, #fff 40%, #3f3 60%, #fff 80%);
  background-size: 200% auto;
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  animation: ${flash} 0.2s linear infinite running;
  text-shadow: 0 0 10px #94f05e;
`;

const Brrr = styled.span<{ $playbackRate: number }>`
  color: #000;
  ${({ $playbackRate }) => $playbackRate >= 90 && flashingBrrr}
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

type Props = {
  playbackRate: number;
  muted: boolean;
  handleToggleMute: () => void;
  handleRateSlider: (value: number) => void;
  handleChangeSymbol: React.Dispatch<React.SetStateAction<string>>;
  symbol: string;
  className?: string;
};

const Controls = ({
  playbackRate,
  muted,
  handleToggleMute,
  handleRateSlider,
  handleChangeSymbol,
  symbol,
  className,
}: Props) => {
  const [symbolModal, setSymbolModal] = useState(false);

  const isCustomSymbol = !tickers.includes(symbol);

  const toggleSymbolModal = () => setSymbolModal((prev) => !prev);

  const rs = new Array(Math.floor(playbackRate / 10) + 1).fill(0);

  return (
    <Container className={className}>
      <Title>
        Money printer go&nbsp;
        <Brrr $playbackRate={playbackRate}>B{rs.map(() => 'R')}</Brrr>
      </Title>
      <ControlBar>
        <Slider value={playbackRate} onChange={handleRateSlider} />
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
                  ariaLabel: 'Choose custom symbol',
                })}
            onClick={toggleSymbolModal}
          />
          <Button
            icon={muted ? faMusicSlash : faMusic}
            aria-label={muted ? 'Unmute' : 'Mute'}
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

export default Controls;
