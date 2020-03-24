import { useState } from 'react';
import styled from 'styled-components';
import Music from '../components/Music';
import Chart from '../components/Chart';
import Controls from '../components/Controls';
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
    const [playing, setPlaying] = useState(true);
    const [playbackRate, setPlaybackRate] = useState(25);
    const [muted, setMute] = useState(false);
    const [symbol, setSymbol] = useState('DJI');

    const handleRateSlider = value => {
        setPlaybackRate(value);
        setPlaying(true);
    };

    const playbackProps = {
        playing,
        playbackRate,
        muted,
        handleToggleMute: () => setMute(prev => !prev)
    };

    let shakeClass = 'shake-constant';
    if (playbackRate >= 90) shakeClass += ' shake-hard';
    else if (playbackRate >= 70) shakeClass += ' shake';
    else if (playbackRate >= 50) shakeClass += ' shake-little';

    return (
        <Container>
            <Music {...playbackProps} />
            <Main>
                <Chart symbol={symbol} className={shakeClass} />
                <Printer {...playbackProps} className={shakeClass} />
                <Controls
                    handleRateSlider={handleRateSlider}
                    handleChangeSymbol={setSymbol}
                    symbol={symbol}
                    playbackProps={playbackProps}
                    className={shakeClass}
                />
            </Main>
            <Footer />
        </Container>
    );
};

export default Home;
