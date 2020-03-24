import { string, func } from 'prop-types';
import styled from 'styled-components';

export const tickers = ['DJI', 'SPY', 'BTCUSD'];

const Switch = styled.div`
    margin: 0 0.5em;
    display: flex;
    flex-direction: row;
    border: solid 2px #000;
    border-radius: 999px;
`;

const Button = styled.button`
    height: 50px;
    padding: 1em;
    font-size: 1em;
    border: none;
    border-radius: 25px;
    ${({ symbol, value }) =>
        symbol === value
            ? 'background: #000; color: #FFF;'
            : 'background: transparent;'}
    cursor: pointer;
`;

const TickerSwitch = ({ symbol, handleChangeSymbol }) => {
    const handleClick = event => {
        event.preventDefault();
        handleChangeSymbol(event.target.value);
    };

    const SwitchButton = ({ value }) => (
        <Button
            type="button"
            value={value}
            symbol={symbol}
            onClick={handleClick}
        >
            {value}
        </Button>
    );

    SwitchButton.propTypes = {
        value: string.isRequired
    };

    return (
        <Switch>
            {tickers.map(ticker => (
                <SwitchButton key={ticker} value={ticker} />
            ))}
        </Switch>
    );
};

TickerSwitch.propTypes = {
    symbol: string.isRequired,
    handleChangeSymbol: func.isRequired
};

export default TickerSwitch;
