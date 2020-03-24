import styled from 'styled-components';
import ReactSlider from 'react-slider';

const Container = styled.div`
    background: #fff
        linear-gradient(
            90deg,
            rgba(183, 217, 29, 1) 0%,
            rgba(255, 134, 0, 1) 50%,
            rgba(255, 0, 0, 1) 100%
        );
    margin: 0 0.5em;
    border-radius: 999px;
`;

const StyledSlider = styled(ReactSlider)`
    width: 100%;
    height: 1.5em;
    margin-bottom: 0.5em;
`;

const StyledThumb = styled.div`
    height: 2em;
    width: 2em;
    position: relative;
    top: -0.25em;
    border: solid 2px #000;
    ${({ value }) =>
        value >= 90
            ? 'background-color: #F00; border-color: #F00;'
            : 'background-color: #FFF;'}
    border-radius: 50%;
    cursor: grab;
`;

const Thumb = (props, state) => <StyledThumb {...props} value={state.value} />;

const StyledTrack = styled.div`
    top: 0;
    bottom: 0;
    border: solid 2px #000;
    border-radius: 999px;
    overflow: auto;
`;

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

const Slider = props => (
    <Container>
        <StyledSlider
            ariaLabel="Printer speed"
            renderTrack={Track}
            renderThumb={Thumb}
            {...props}
        />
    </Container>
);

export default Slider;
