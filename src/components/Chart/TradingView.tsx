import React, { useEffect } from 'react';
import styled from 'styled-components';
// Source: https://git.io/Jv1ZT

export enum BarStyles {
  BARS = '0',
  CANDLES = '1',
  HOLLOW_CANDLES = '9',
  HEIKIN_ASHI = '8',
  LINE = '2',
  AREA = '3',
  RENKO = '4',
  LINE_BREAK = '7',
  KAGI = '5',
  POINT_AND_FIGURE = '6',
}

export enum IntervalTypes {
  D = 'D',
  W = 'W',
  H = 'H',
}

export enum RangeTypes {
  YTD = 'ytd',
  ALL = 'all',
}

export enum Themes {
  LIGHT = 'Light',
  DARK = 'Dark',
}

const SCRIPT_ID = 'tradingview-widget-script';
const CONTAINER_ID = 'tradingview-widget';

const canUseDOM = () =>
  !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );

const getScriptElement = () => document.getElementById(SCRIPT_ID);

const scriptExists = () => !!getScriptElement();

const cleanWidget = () => {
  if (!canUseDOM()) return;
  const scriptElement = getScriptElement();
  if (scriptElement) {
    scriptElement.innerHTML = '';
  }
};

const Attribution = styled.div`
  color: #999;
  font-size: 12px;

  a {
    color: #09f;

    &:visited {
      color: #09f;
    }
  }
`;

type Props = {
  allow_symbol_change?: boolean;
  autosize?: boolean;
  calendar?: boolean;
  details?: boolean;
  enable_publishing?: boolean;
  height?: number;
  hideideas?: boolean;
  hide_legend?: boolean;
  hide_side_toolbar?: boolean;
  hide_top_toolbar?: boolean;
  hotlist?: boolean;
  interval?:
    | 1
    | 3
    | 5
    | 15
    | 30
    | 60
    | 120
    | 180
    | '1'
    | '3'
    | '5'
    | '15'
    | '30'
    | '60'
    | '120'
    | '180'
    | IntervalTypes;
  locale?: string;
  news?: string[];
  no_referral_id?: boolean;
  popup_height?: number | string;
  popup_width?: number | string;
  range?: '1d' | '5d' | '1m' | '3m' | '6m' | '12m' | '60m' | RangeTypes;
  referral_id?: string;
  save_image?: boolean;
  show_popup_button?: boolean;
  studies?: string[];
  style?: BarStyles;
  symbol: string;
  theme?: Themes;
  timezone?: string;
  toolbar_bg?: string;
  watchlist?: string[];
  widgetType?: string;
  width?: number;
  withdateranges?: boolean;
};

export const TradingViewWidget = ({
  allow_symbol_change = true,
  autosize = true,
  calendar,
  details,
  enable_publishing = true,
  height = 300,
  hideideas = true,
  hide_legend = true,
  hide_side_toolbar = true,
  hide_top_toolbar = true,
  hotlist,
  interval = IntervalTypes.H,
  locale = 'en',
  news,
  no_referral_id,
  popup_height,
  popup_width,
  range,
  referral_id,
  save_image = false,
  show_popup_button = false,
  studies,
  style = BarStyles.CANDLES,
  symbol,
  theme = Themes.LIGHT,
  timezone = 'Etc/UTC',
  toolbar_bg = '#FFF',
  watchlist,
  widgetType = 'widget',
  width = 400,
  withdateranges = false,
}: Props) => {
  const initWidget = () => {
    if (
      typeof TradingView === 'undefined' ||
      !document.getElementById(CONTAINER_ID)
    )
      return;

    const config: any = {
      container_id: CONTAINER_ID,
      allow_symbol_change,
      autosize,
      calendar,
      details,
      enable_publishing,
      height,
      hideideas,
      hide_legend,
      hide_side_toolbar,
      hide_top_toolbar,
      hotlist,
      interval,
      locale,
      news,
      no_referral_id,
      popup_height,
      popup_width,
      range,
      referral_id,
      save_image,
      show_popup_button,
      studies,
      style,
      symbol,
      theme,
      timezone,
      toolbar_bg,
      watchlist,
      widgetType,
      width,
      withdateranges,
    };

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

    new TradingView[widgetType](config);
  };

  const updateOnloadListener = (onload: () => void) => {
    const script = getScriptElement();
    if (!script) {
      return;
    }
    const oldOnload = script.onload;
    return (script.onload = () => {
      (oldOnload as () => void)?.();
      onload();
    });
  };

  useEffect(() => {
    const appendScript = () => {
      if (!canUseDOM()) {
        initWidget();
        return;
      }

      if (scriptExists()) {
        if (typeof TradingView === 'undefined') {
          updateOnloadListener(initWidget);
          return;
        }
        initWidget();
        return;
      }

      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://s3.tradingview.com/tv.js';
      script.onload = initWidget;
      document.getElementsByTagName('head')[0].appendChild(script);
    };

    appendScript();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    cleanWidget();
    initWidget();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol]);

  return (
    <>
      <section
        id={CONTAINER_ID}
        style={autosize ? { width: '100%', height: '100%' } : {}}
      />
      <Attribution>
        <a
          href={`https://www.tradingview.com/symbols/${symbol}/`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span>{symbol} Chart</span>
        </a>{' '}
        by TradingView
      </Attribution>
    </>
  );
};
