import { string, shape } from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledButton = styled.button`
    margin: 0 0.5em;
    height: 54px;
    width: 54px;
    padding: 1em;
    text-align: center;
    font-size: 1em;
    ${({ active }) =>
        active ? 'background: #000; color: #FFF;' : 'background: #FFF;'};
    border: solid 2px #000;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const Icon = styled(FontAwesomeIcon)`
    font-size: 1.5em;
    margin-top: -0.125em;
`;

const Button = ({ label, icon, ...props }) => (
    <StyledButton icon {...props}>
        {icon && <Icon icon={icon} />}
        {label}
    </StyledButton>
);

Button.propTypes = {
    type: string,
    label: string,
    icon: shape({})
};

Button.defaultProps = {
    type: 'button',
    label: '',
    icon: undefined
};

export default Button;
