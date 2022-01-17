import styled from 'styled-components';
import { TradingViewWidget } from './TradingView';

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

type Props = {
  symbol: string;
  className?: string;
};

const Chart = ({ symbol, ...props }: Props) => (
  <ChartWrapper {...props}>
    <TradingViewWidget symbol={symbol} />
  </ChartWrapper>
);

export default Chart;
