import { node } from 'prop-types';
import styled from 'styled-components';

const btcAddress = '3ASWubQJjdFqL84YRyFs31z5c2CsM9CFR4';
const ethAddress = '0x5798eF66524312730903d673A9Ac6F7ea993A4d4';

const Container = styled.footer`
    width: 100%;
    height: 50px;
    padding: 0 0.5em;
    font-size: 0.75em;
    color: #aaa;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: center;
    align-items: center;

    @media only screen and (max-width: 1000px) {
        height: 150px;
    }

    @media only screen and (max-width: 768px) {
        margin-top: 1em;
    }
`;

const List = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    @media only screen and (max-width: 1000px) {
        flex-direction: column;
    }
`;

const StyledDot = styled.span`
    user-select: none;
    pointer-events: none;

    @media only screen and (max-width: 1000px) {
        display: none;
    }
`;

const Dot = () => <StyledDot>&middot;</StyledDot>;

const Item = styled.li`
    display: inline-block;
    margin: 0 1em;

    @media only screen and (max-width: 768px) {
        display: block;
        margin: 0.25em;
    }
`;

const Link = styled.a`
    color: #000;
    font-weight: bold;
    margin: 0 0.25em;
`;

const ExternalLink = ({ children, ...props }) => (
    <Link target="_blank" rel="noopener noreferrer" {...props}>
        {children}
    </Link>
);

const IMRDBadge = styled.div`
    display: flex;
    align-items: center;
`;

const IMRDLink = styled(ExternalLink)`
    display: flex;
    align-items: center;
`;

const IMRDLogo = styled.img`
    height: 20px;
    margin: 0 0.5em;
`;

ExternalLink.propTypes = {
    children: node.isRequired
};

const Footer = props => (
    <Container {...props}>
        <List>
            <Item>
                <IMRDBadge>
                    A project by
                    <IMRDLink href="https://memetic.institute">
                        <IMRDLogo
                            src={require('./imrd.svg')}
                            alt="Institute of Memetic Research and Development"
                        />
                        IMRD
                    </IMRDLink>
                </IMRDBadge>
            </Item>
            <Dot />
            <Item>
                Like this? Play
                <ExternalLink href="https://thefed.app">The Fed</ExternalLink>
            </Item>
            <Dot />
            <Item>
                <ExternalLink href="https://memetic.institute/gib">
                    Donate
                </ExternalLink>
            </Item>
            <Dot />
            <Item>
                Try
                <ExternalLink href="https://brave.com/brr259">
                    Brave Browser
                </ExternalLink>
            </Item>
        </List>
    </Container>
);

export default Footer;
