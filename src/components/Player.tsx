import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';

const play = (player?: ReactPlayer | null) => {
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
      onUnstarted={handleReady}
      {...props}
    />
  );
};

export default Player;
