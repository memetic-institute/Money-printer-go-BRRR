import { useState, useEffect, useRef } from 'react';
import { string, func } from 'prop-types';
import styled from 'styled-components';
import { faCheck } from '@fortawesome/pro-solid-svg-icons';
import Button from './Button';

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(15px);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9999;
`;

const Title = styled.h2`
    margin-top: 0;
    text-align: center;
    font-size: 2em;
`;

const Form = styled.form`
    display: flex;
    flex-direction: row;
`;

const TickerInput = styled.input`
    flex: 1;
    width: 150px;
    margin-right: 0.5em;
    padding: 0 0.5em;
    font-size: 2em;
    background: #fff;
    border: solid 2px #000;
    border-radius: 15px;
    display: flex;
    transition: border-color 0.15s ease-in-out;

    &:focus {
        outline: none;
        border-color: #09f;
    }
`;

const TickerForm = ({ symbol, handleChangeSymbol, handleToggle, ...props }) => {
    const inputRef = useRef();

    const [inputSymbol, setInputSymbol] = useState(symbol);

    const handleSubmit = event => {
        if (event) event.preventDefault();
        handleChangeSymbol(inputSymbol.trim());
        handleToggle();
    };

    const handleChange = event => {
        setInputSymbol(event.target.value.toUpperCase());
    };

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <Container {...props}>
            <Title>Enter a ticker symbol</Title>
            <Form onSubmit={handleSubmit}>
                <TickerInput
                    ref={inputRef}
                    value={inputSymbol}
                    placeholder={symbol}
                    onChange={handleChange}
                />
                <Button type="submit" icon={faCheck} ariaLabel="Close" />
            </Form>
        </Container>
    );
};

TickerForm.propTypes = {
    symbol: string.isRequired,
    handleChangeSymbol: func.isRequired,
    handleToggle: func.isRequired
};

export default TickerForm;
