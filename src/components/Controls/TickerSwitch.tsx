import styled from 'styled-components';

export const tickers = ['DJI', 'SPY', 'BTCUSD'];

const Switch = styled.div`
  margin: 0 0.5em;
  display: flex;
  flex-direction: row;
  border: solid 2px #000;
  border-radius: 999px;
`;

const SwitchButton = styled.button<{ $active: boolean }>`
  height: 50px;
  padding: 1em;
  font-size: 1em;
  border: none;
  border-radius: 25px;
  ${({ $active }) =>
    $active ? 'background: #000; color: #FFF;' : 'background: transparent;'}
  cursor: pointer;
`;

type Props = {
  symbol: string;
  handleChangeSymbol: (symbol: string) => void;
};

const TickerSwitch = ({ symbol, handleChangeSymbol }: Props) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    handleChangeSymbol(event.currentTarget.value);
  };

  return (
    <Switch>
      {tickers.map((ticker) => (
        <SwitchButton
          key={ticker}
          $active={symbol === ticker}
          value={ticker}
          onClick={handleClick}
        >
          {ticker}
        </SwitchButton>
      ))}
    </Switch>
  );
};

export default TickerSwitch;
