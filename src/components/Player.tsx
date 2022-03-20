import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer, { ReactPlayerProps, Config } from 'react-player';
import { YouTubeConfig } from 'react-player/youtube';

const play = (player?: ReactPlayer | null) => {
  try {
    const internalPlayer = player?.getInternalPlayer();
    if (!internalPlayer) {
      return;
    }
    player!.seekTo(0);
    if (internalPlayer.playVideo) {
      internalPlayer.playVideo();
    } else {
      internalPlayer.play?.();
    }
  } catch (error) {
    console.error('Failed to play video', error);
  }
};

type Props = ReactPlayerProps & {
  className?: string;
  url: string;
  player: typeof ReactPlayer;
};

const Player = ({
  player: ReactPlayer,
  url,
  muted = true,
  playbackRate = 1,
  className,
  ...props
}: Props) => {
  const [playing, setPlaying] = useState(false);

  const ref = useRef<ReactPlayer | null>(null);

  const handleReady = () => {
    setTimeout(() => {
      play(ref.current);
      setPlaying(true);
    }, 300);
  };

  useEffect(handleReady, []);

  return (
    <ReactPlayer
      ref={ref}
      loop
      tabIndex="-1"
      playsinline
      playing={playing}
      url={url}
      muted={!playing ? true : muted}
      volume={playing ? 1 : 0}
      playbackRate={playbackRate}
      className={className}
      onReady={handleReady}
      config={
        (url.includes('youtube')
          ? ({ ...props.config, onUnstarted: handleReady } as YouTubeConfig)
          : props.config) as Config
      }
      {...props}
    />
  );
};

export default Player;
