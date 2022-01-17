import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const StyledButton = styled.button<{ $active: boolean }>`
  margin: 0 0.5em;
  height: 54px;
  width: 54px;
  padding: 1em;
  text-align: center;
  font-size: 1em;
  ${({ $active }) =>
    $active ? 'background: #000; color: #FFF;' : 'background: #FFF;'};
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

type Props = React.HTMLAttributes<HTMLButtonElement> & {
  type?: 'button' | 'submit' | 'reset';
  label?: string;
  icon?: IconProp;
  active?: boolean;
};

const Button = ({ type = 'button', label, icon, active, ...props }: Props) => (
  <StyledButton type={type} $active={!!active} {...props}>
    {icon && <Icon icon={icon} />}
    {label}
  </StyledButton>
);

export default Button;
