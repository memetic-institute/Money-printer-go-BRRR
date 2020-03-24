import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Source: https://git.io/Jv1ZT

export const BarStyles = {
    BARS: '0',
    CANDLES: '1',
    HOLLOW_CANDLES: '9',
    HEIKIN_ASHI: '8',
    LINE: '2',
    AREA: '3',
    RENKO: '4',
    LINE_BREAK: '7',
    KAGI: '5',
    POINT_AND_FIGURE: '6'
};

export const IntervalTypes = {
    D: 'D',
    W: 'W',
    H: 'H'
};

export const RangeTypes = {
    YTD: 'ytd',
    ALL: 'all'
};

export const Themes = {
    LIGHT: 'Light',
    DARK: 'Dark'
};

const SCRIPT_ID = 'tradingview-widget-script';
const CONTAINER_ID = 'tradingview-widget';

class TradingViewWidget extends PureComponent {
    containerId = CONTAINER_ID;

    componentDidMount = () => this.appendScript(this.initWidget);

    componentDidUpdate = () => {
        this.cleanWidget();
        this.initWidget();
    };

    canUseDOM = () =>
        !!(
            typeof window !== 'undefined' &&
            window.document &&
            window.document.createElement
        );

    appendScript = onload => {
        if (!this.canUseDOM()) {
            onload();
            return;
        }

        if (this.scriptExists()) {
            /* global TradingView */
            if (typeof TradingView === 'undefined') {
                this.updateOnloadListener(onload);
                return;
            }
            onload();
            return;
        }
        const script = document.createElement('script');
        script.id = SCRIPT_ID;
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://s3.tradingview.com/tv.js';
        script.onload = onload;
        document.getElementsByTagName('head')[0].appendChild(script);
    };

    getScriptElement = () => document.getElementById(SCRIPT_ID);

    scriptExists = () => this.getScriptElement() !== null;

    updateOnloadListener = onload => {
        const script = this.getScriptElement();
        const oldOnload = script.onload;
        return (script.onload = () => {
            oldOnload();
            onload();
        });
    };

    initWidget = () => {
        /* global TradingView */
        if (
            typeof TradingView === 'undefined' ||
            !document.getElementById(this.containerId)
        )
            return;

        const { widgetType, ...widgetConfig } = this.props;
        const config = { ...widgetConfig, container_id: this.containerId };

        if (config.autosize) {
            delete config.width;
            delete config.height;
        }

        if (typeof config.interval === 'number')
            config.interval = config.interval.toString();

        if (config.popup_width && typeof config.popup_width === 'number')
            config.popup_width = config.popup_width.toString();

        if (config.popup_height && typeof config.popup_height === 'number')
            config.popup_height = config.popup_height.toString();

        /* global TradingView */
        new TradingView[widgetType](config);
    };

    cleanWidget = () => {
        if (!this.canUseDOM()) return;
        document.getElementById(this.containerId).innerHTML = '';
    };

    getStyle = () => {
        if (!this.props.autosize) return {};
        return {
            width: '100%',
            height: '100%'
        };
    };

    render = () => <section id={this.containerId} style={this.getStyle()} />;
}

TradingViewWidget.propTypes = {
    allow_symbol_change: PropTypes.bool,
    autosize: PropTypes.bool,
    calendar: PropTypes.bool,
    details: PropTypes.bool,
    enable_publishing: PropTypes.bool,
    height: PropTypes.number,
    hideideas: PropTypes.bool,
    hide_legend: PropTypes.bool,
    hide_side_toolbar: PropTypes.bool,
    hide_top_toolbar: PropTypes.bool,
    hotlist: PropTypes.bool,
    interval: PropTypes.oneOf([
        1,
        3,
        5,
        15,
        30,
        60,
        120,
        180,
        '1',
        '3',
        '5',
        '15',
        '30',
        '60',
        '120',
        '180',
        IntervalTypes.D,
        IntervalTypes.W,
        IntervalTypes.H
    ]),
    locale: PropTypes.string,
    news: PropTypes.arrayOf(PropTypes.string),
    no_referral_id: PropTypes.bool,
    popup_height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    popup_width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    range: PropTypes.oneOf([
        '1d',
        '5d',
        '1m',
        '3m',
        '6m',
        RangeTypes.YTD,
        '12m',
        '60m',
        RangeTypes.ALL
    ]),
    referral_id: PropTypes.string,
    save_image: PropTypes.bool,
    show_popup_button: PropTypes.bool,
    studies: PropTypes.arrayOf(PropTypes.string),
    style: PropTypes.oneOf([
        BarStyles.BARS,
        BarStyles.CANDLES,
        BarStyles.HOLLOW_CANDLES,
        BarStyles.HEIKIN_ASHI,
        BarStyles.LINE,
        BarStyles.AREA,
        BarStyles.RENKO,
        BarStyles.LINE_BREAK,
        BarStyles.KAGI,
        BarStyles.POINT_AND_FIGURE
    ]),
    symbol: PropTypes.string.isRequired,
    theme: PropTypes.oneOf([Themes.LIGHT, Themes.DARK]),
    timezone: PropTypes.string,
    toolbar_bg: PropTypes.string,
    watchlist: PropTypes.arrayOf(PropTypes.string),
    widgetType: PropTypes.string,
    width: PropTypes.number,
    withdateranges: PropTypes.bool
};

TradingViewWidget.defaultProps = {
    allow_symbol_change: true,
    autosize: true,
    enable_publishing: false,
    height: 300,
    hideideas: true,
    hide_legend: false,
    hide_side_toolbar: true,
    hide_top_toolbar: true,
    interval: 'H',
    locale: 'en',
    save_image: false,
    show_popup_button: false,
    style: BarStyles.CANDLES,
    theme: Themes.LIGHT,
    timezone: 'Etc/UTC',
    toolbar_bg: '#FFF',
    widgetType: 'widget',
    width: 400,
    withdateranges: false
};

export default TradingViewWidget;
