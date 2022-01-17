import { useState } from 'react';
import styled from 'styled-components';
import Music from '../components/Music';
import Chart from '../components/Chart';
import Controls from '../components/Controls/Controls';
import Printer from '../components/Printer';
import Footer from '../components/Footer';
import 'csshake';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Main = styled.main`
  width: 100%;
  flex: 1;
  overflow: hidden;
`;

const Home = () => {
  const [playbackRate, setPlaybackRate] = useState(25);
  const [muted, setMute] = useState(false);
  const [symbol, setSymbol] = useState('DJI');

  const handleRateSlider = (value: number) => {
    setPlaybackRate(value);
  };

  const handleToggleMute = () => setMute((prev) => !prev);

  let shakeClass = 'shake-constant';
  if (playbackRate >= 90) shakeClass += ' shake-hard';
  else if (playbackRate >= 70) shakeClass += ' shake';
  else if (playbackRate >= 50) shakeClass += ' shake-little';

  return (
    <Container>
      <Music playbackRate={playbackRate} muted={muted} />
      <Main>
        <Chart symbol={symbol} className={shakeClass} />
        <Printer playbackRate={playbackRate} className={shakeClass} />
        <Controls
          handleRateSlider={handleRateSlider}
          handleChangeSymbol={setSymbol}
          symbol={symbol}
          playbackRate={playbackRate}
          muted={muted}
          handleToggleMute={handleToggleMute}
          className={shakeClass}
        />
      </Main>
      <Footer />
    </Container>
  );
};

export default Home;
