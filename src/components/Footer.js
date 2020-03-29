import React from 'react';
import { node, shape, string, arrayOf } from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faShareAlt } from '@fortawesome/pro-solid-svg-icons';
import {
    faBitcoin,
    faTwitter,
    faFacebook,
    faDiscord,
    faPatreon,
    faGithub
} from '@fortawesome/free-brands-svg-icons';

const white = '#FFF';
const black = '#000';
const grey = '#AAA';
const brandColor = '#498200';
const twitterColor = '#1DA1F2';

const flexCenter = css`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Container = styled.footer`
    width: 100%;
    font-size: 0.75rem;
    color: ${grey};
    background: ${white};
    border-top: 1px solid #eee;
    ${flexCenter}
    z-index: 5;

    @media only screen and (max-width: 925px) {
        flex-direction: column;
    }
`;

const Item = styled.div`
    ${flexCenter}
    flex: 1;
    width: 100%;
    height: 100%;
    text-align: center;
`;

const Link = styled.a`
    ${flexCenter}
    color: ${black};
    font-weight: bold;
    text-align: center;
    min-height: 38px;
    padding: 0.75em 1em;
    height: 100%;
    width: 100%;

    &:hover,&:focus {
        background: ${({ color }) => color};
        color: ${white};
        text-decoration: none;
    }

    &:active {
        opacity: 0.5;
    }
`;

const linkHoverContents = css`
    ${Link}:hover &,
    ${Link}:focus & {
        color: ${white};
        cursor: pointer;
    }
`;

const Icon = styled(FontAwesomeIcon)`
    color: ${({ color }) => color};
    transition: transform 0.2s ease;
    ${({ sibling }) =>
        sibling &&
        css`
            margin-right: 0.25em;
        `}

    ${linkHoverContents}
`;

const ExternalLink = ({ children, icon, color, ...props }) => (
    <Link target="_blank" rel="noopener noreferrer" color={color} {...props}>
        {icon && (
            <Icon
                icon={icon}
                color={color}
                sibling={children}
                size="lg"
                fixedWidth
            />
        )}
        {children}
    </Link>
);
ExternalLink.propTypes = {
    children: node,
    icon: shape({}),
    color: string
};
ExternalLink.defaultProps = {
    children: undefined,
    icon: undefined,
    color: black
};

const Label = styled.label`
    color: ${grey};
    font-weight: normal;

    ${linkHoverContents}
`;

const IMRDLogo = styled.svg`
    height: 20px;
    width: 20px;
    margin: 0 0.5em;
`;

const IMRDFrog = styled.path`
    fill: ${white};

    ${Link}:hover &,
    ${Link}:focus & {
        fill: ${brandColor};
    }
`;

const IMRDSquare = styled.path`
    fill: ${brandColor};

    ${Link}:hover &,
    ${Link}:focus & {
        fill: ${white};
    }
`;

const SocialLink = styled(ExternalLink)`
    display: inline-block;
`;

const twitterUrl = 'https://twitter.com';
const twitterIntent = ({ url, handle, text, hashtags }) =>
    encodeURI(
        `${twitterUrl}/intent/tweet?url=${url}&via=${handle}&text=${text}&hashtags=${hashtags.map(
            hashtag => `#${hashtag}`
        )}`
    );

const Footer = ({ homepage, tweet, items, ...props }) => {
    const footerItems = [
        {
            children: (
                <>
                    <Label>A project by</Label>
                    <IMRDLogo
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g fill="none">
                            <IMRDFrog fill={white} d="M0 0h512v512H0z" />
                            <IMRDSquare fill={brandColor} d="M512 0v512H0V0h512zM256.828 81h-2.69c-1.346 0-1.915 2.922-1.915 2.922-10.405 2.181-15.049 14.172-16.735 20.185l-11.524 9.562-3.506 2.637-.345.087c-.676.181-2.304.672-4.507 1.697a11.592 11.592 0 00-3.734-.626c-6.387 0-11.561 5.179-11.561 11.572 0 .323.019.645.038.949l-.471.568c-7.68 9.408-14.578 24.772-14.578 49.573l-.222.909c-1.493 5.881-10.534 37.781-27.108 20.586l-41.64-48.207-.058-.715c-.28-3.744-1.256-21.3 4.057-31.025 3.052-.626 5.345-3.32 5.345-6.545 0-3.68-2.994-6.678-6.671-6.678s-6.672 2.997-6.672 6.678c0 1.062.247 2.067.702 2.96l-.426.713c-3.834 6.55-8.889 18.395-4.066 29.64L90.78 128.75c.38-.853.607-1.783.607-2.77 0-3.68-2.994-6.678-6.671-6.678s-6.672 2.998-6.672 6.678a6.67 6.67 0 006.274 6.66l17.057 20.11-.872.447c-3.137 1.574-14.022 6.712-20.715 5.794a6.676 6.676 0 00-6.444-4.951c-3.677 0-6.671 2.997-6.671 6.678 0 3.68 2.994 6.678 6.671 6.678a6.634 6.634 0 005.269-2.58l.908.098c5.577.58 16.692 1.265 25.114-1.085l40.351 52.113.169.48c1.76 4.869 17.284 44.581 46.038 15.798l-.236.722c-2.003 6.286-15.42 52.137 9.997 79.395l-.975-.514c-8.417-4.372-68.432-34.159-65.4 7.021l.51 1.39c3.004 8.06 18.817 48.563 34.63 52.68l.032.294c.183 2.13.274 14.407-26.055-11.372l-13.021-9.77-11.846-28.458a6.67 6.67 0 003.98-6.11c0-3.68-2.994-6.677-6.671-6.677s-6.671 2.997-6.671 6.678c0 2.03.91 3.85 2.33 5.065v8.651l-11.617-11.63c1.497-1.233 2.464-3.092 2.464-5.179 0-3.68-2.995-6.678-6.672-6.678-3.677 0-6.671 2.998-6.671 6.678a6.67 6.67 0 003.98 6.11l6.16 18.516-21.531-15.557c.095-.455.151-.93.151-1.404 0-3.68-2.994-6.678-6.671-6.678s-6.671 2.998-6.671 6.678c0 3.68 2.994 6.678 6.671 6.678.436 0 .872-.038 1.289-.133l18.953 20.186-21.796 8.424a6.585 6.585 0 00-3.166-.797c-3.676 0-6.671 2.997-6.671 6.678 0 3.68 2.995 6.678 6.671 6.678 3.677 0 6.672-2.998 6.672-6.678 0-.152 0-.323-.02-.475l.581-.254c7.056-3.068 20.706-8.023 26.826-3.52l25.378 19.123 1.105 1.225c9.554 10.507 77.947 83.86 82.193 35.39l-7.808-45.589.643.443c4.756 3.237 34.515 22.79 42.687 11.035l.262-.398s-2.161 14.323 10.31 18.231c12.471-3.908 10.31-18.231 10.31-18.231 8.454 13.678 43.592-11.08 43.592-11.08l-7.808 45.59c4.548 52.112 83.298-36.616 83.298-36.616l25.378-19.124c6.312-4.629 20.564.74 27.406 3.775l-.019.475c0 3.68 2.995 6.678 6.672 6.678 3.676 0 6.671-2.998 6.671-6.678-.019-3.662-2.995-6.66-6.671-6.66a6.637 6.637 0 00-3.163.797l-21.796-8.423 18.953-20.186a7.24 7.24 0 001.289.133c3.677 0 6.671-2.998 6.671-6.678 0-3.68-2.994-6.678-6.671-6.678s-6.671 2.997-6.671 6.678c0 .493.056.949.151 1.404l-21.53 15.557 6.16-18.517c2.33-1.043 3.98-3.377 3.98-6.109 0-3.68-2.995-6.678-6.672-6.678-3.677 0-6.672 2.998-6.672 6.678 0 2.087.967 3.946 2.464 5.18l-11.618 11.63v-8.652c1.422-1.233 2.331-3.035 2.331-5.065 0-3.68-2.994-6.678-6.671-6.678s-6.671 2.997-6.671 6.678a6.67 6.67 0 003.98 6.108l-11.846 28.458-13.02 9.77c-28.638 28.003-26.042 11.08-26.042 11.08 17.57-4.553 35.139-54.07 35.139-54.07 3.26-44.3-66.375-6.508-66.375-6.508 27.33-29.311 9.76-80.117 9.76-80.117 30.59 30.62 46.208-16.278 46.208-16.278l40.35-52.113c8.908 2.486 20.83 1.556 26.023.987a6.634 6.634 0 005.269 2.58c3.677 0 6.671-2.998 6.671-6.678 0-3.68-2.994-6.678-6.671-6.678a6.676 6.676 0 00-6.444 4.951c-7.884 1.082-21.606-6.242-21.606-6.242l17.057-20.11c3.488-.208 6.274-3.11 6.274-6.659 0-3.68-2.995-6.678-6.672-6.678-3.676 0-6.671 2.998-6.671 6.678 0 .987.227 1.935.606 2.77l-17.74 19.674c5.004-11.667-.625-23.98-4.491-30.355a6.737 6.737 0 00.701-2.96c0-3.68-2.994-6.677-6.671-6.677s-6.672 2.997-6.672 6.678c0 3.225 2.294 5.919 5.345 6.545 5.97 10.947 3.98 31.74 3.98 31.74l-41.64 48.207c-18.213 18.896-27.33-21.495-27.33-21.495 0-25.327-7.183-40.789-15.048-50.141.019-.323.038-.626.038-.949 0-6.393-5.174-11.572-11.562-11.572-1.307 0-2.558.208-3.733.626l-.539-.245c-2.628-1.172-4.294-1.539-4.294-1.539l-3.525-2.637-11.524-9.562-.222-.76c-1.868-6.21-6.53-17.332-16.513-19.425l-.045-.2c-.157-.66-.74-2.722-1.87-2.722z" />
                        </g>
                    </IMRDLogo>
                    IMRD
                </>
            ),
            href: homepage,
            color: brandColor
        },
        ...items
    ];

    return (
        <Container {...props}>
            {footerItems.map(item => (
                <Item key={item.href || 'SocialLinks'}>
                    {Array.isArray(item) ? (
                        item.map(link => (
                            <SocialLink key={link.href} {...link} />
                        ))
                    ) : (
                        <ExternalLink
                            {...{
                                ...item,
                                ...(item.isTwitterIntent
                                    ? { href: twitterIntent(tweet) }
                                    : {})
                            }}
                        />
                    )}
                </Item>
            ))}
        </Container>
    );
};

Footer.propTypes = {
    homepage: string,
    tweet: shape({
        url: string,
        text: string,
        hashtags: arrayOf(string)
    }),
    items: arrayOf(
        shape({
            children: node,
            title: string,
            href: string,
            icon: shape({}),
            color: string,
            className: string
        })
    )
};

const homepage = 'https://memetic.institute';
const tweet = {
    url: 'https://brrr.money',
    text: "Live-stream of the @federalreserve's liquidity operations:",
    handle: 'memetic_insti2t',
    hashtags: ['brrr', 'federalreserve']
};
const items = [
    {
        children: 'More Memes',
        href: `${homepage}/projects`,
        icon: faPlusCircle,
        color: '#700fdd'
    },
    {
        children: 'Donate',
        href: `${homepage}/gib`,
        icon: faBitcoin,
        color: '#f90'
    },
    {
        children: 'Share',
        className: 'share-twitter',
        href: twitterIntent(tweet),
        icon: faShareAlt,
        color: twitterColor,
        isTwitterIntent: true
    },
    [
        {
            title: 'Twitter',
            href: `${twitterUrl}/${tweet.handle}`,
            icon: faTwitter,
            color: twitterColor
        },
        {
            title: 'Facebook',
            href:
                'https://fb.me/institute.for.memetic.research.and.development',
            icon: faFacebook,
            color: '#4267B2'
        },
        {
            title: 'Discord',
            href: 'https://discord.gg/mUxVBb4',
            icon: faDiscord,
            color: '#7289DA'
        },
        {
            title: 'Patreon',
            href: 'https://www.patreon.com/memeticinstitute',
            icon: faPatreon,
            color: '#f96854'
        },
        {
            title: 'GitHub',
            href: 'https://github.com/memetic-institute/Money-printer-go-BRRR',
            icon: faGithub,
            color: black
        }
    ]
];

Footer.defaultProps = {
    homepage,
    tweet,
    items
};

export default Footer;
