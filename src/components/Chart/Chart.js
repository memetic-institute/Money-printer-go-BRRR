import { string } from 'prop-types';
import styled from 'styled-components';
import TradingView from './TradingView';

const ChartWrapper = styled.div`
    position: absolute;
    top: 2em;
    left: 2em;
    width: 50%;
    height: 50%;
    z-index: 10;

    @media only screen and (max-width: 768px) {
        width: calc(100% - 4em);
        height: 300px;
    }
`;

const Chart = ({ symbol, ...props }) => (
    <ChartWrapper {...props}>
        <TradingView symbol={symbol} />
    </ChartWrapper>
);

Chart.propTypes = {
    symbol: string.isRequired
};

export default Chart;
