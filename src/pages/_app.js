import NextApp from 'next/app';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';
import 'focus-visible';

const title = 'Money printer go BRRR';
const description = 'Print it, baby!';
const author = 'Institute for Memetic Research & Development';
const url = 'https://brrr.money';
const brandColor = '#000000';

const GlobalStyle = createGlobalStyle`
    html,
    body {
        padding: 0;
        margin: 0;
        font: 16px / 1.5 -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans',
            'Helvetica Neue', sans-serif;
        color: #000;
    }

    * {
        box-sizing: border-box;

        &:focus:not([data-focus-visible-added]) {
            outline: none;
        }
    }

    a {
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
    }
`;

class App extends NextApp {
    render() {
        const { Component, pageProps } = this.props;
        return (
            <>
                <Head>
                    <title>{title}</title>
                    <meta charSet="utf-8" />
                    <meta name="application-name" content={title} />
                    <meta name="description" content={description} />
                    <meta name="author" content={author} />
                    <link rel="canonical" href={url} />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    {/* Open Graph */}
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content={title} />
                    <meta property="og:author" content={author} />
                    <meta property="og:site_name" content={title} />
                    <meta property="og:description" content={description} />
                    <meta property="og:url" content={url} />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />
                    <meta
                        property="og:image"
                        content={`${url}/open-graph.png`}
                    />
                    <meta property="og:image:alt" content={title} />
                    {/* Favicons */}
                    {[16, 32].map(size => {
                        const dimensions = `${size}x${size}`;
                        return (
                            <link
                                key={size}
                                rel="icon"
                                type="image/png"
                                sizes={dimensions}
                                href={`/icons/favicon-${dimensions}.png`}
                            />
                        );
                    })}
                    {/* Safari */}
                    <meta name="apple-mobile-web-app-title" content={title} />
                    <link
                        rel="apple-touch-icon"
                        sizes="300x300"
                        href="/icons/apple-touch-icon.png"
                    />
                    <link
                        rel="mask-icon"
                        href="/icons/safari-pinned-tab.svg"
                        color={brandColor}
                    />
                    {/* Windows */}
                    <meta
                        name="msapplication-config"
                        content="/browserconfig..xml"
                    />
                    {/* PWA manifest */}
                    <link rel="manifest" href="/site.webmanifest" />
                    <meta name="theme-color" content={brandColor} />
                    {/* Font Awesome */}
                    <link
                        href="https://use.fontawesome.com/releases/v5.12.1/css/svg-with-js.css"
                        rel="stylesheet"
                    />
                </Head>
                <GlobalStyle />
                <Component {...pageProps} />
            </>
        );
    }
}

export default App;
