import { IoIosSkipForward, IoIosSkipBackward } from 'react-icons/io';
import { IoIosPlay, IoIosPause } from 'react-icons/io';
import { Link } from 'react-router-dom';
import './style.css';
interface IPlayerContext {
  track: string;
  isPlaying: boolean;
  setIsPlaying(is: boolean): void;
  setTrack(track: string): void;
  musicRef: any;
  infoTrack: any;
  play(): void;
  stop(): void;
}

export default function Player({
  infoTrack, setIsPlaying, track, setTrack, isPlaying, musicRef,
  play,
  stop
}: IPlayerContext) {


  return (
    <div className="player-container">
      <img
        src={
          infoTrack?.album?.images[0]?.url
        }
        alt=""
      />
      <div>
        <h4 title={infoTrack?.name}>{infoTrack?.name}</h4>
        <Link
          title={infoTrack?.artists[0]?.name}
          to={`/artist/${infoTrack?.artists[0]?.id}`}
        >
          {infoTrack?.artists[0]?.name}
        </Link>
        <div className="audio-player">
          <p className="current-duration">{musicRef.current?.currentTime.toFixed(1) || '00:00'}</p>

          <input
            type="range"
            step={1}
            value={musicRef.current?.currentTime.toFixed(1)}
            min={0}
            max={musicRef.current?.duration.toFixed(1)}
            className="player-slider"
          />

          <p className="final-duration">{musicRef.current?.duration.toFixed(1) || '00:00'}</p>
        </div>
      </div>
      {
        isPlaying ? (
          <img className="is-playing-img-fixed" src="https://open.scdn.co/cdn/images/equaliser-animated-green.73b73928.gif" alt="" />
        ) : (
          <IoIosPlay
            className="btn-player-fixed"
            onClick={() => {
              setIsPlaying(true);
              play();
            }}
            size={50} color="#fff"
          />
        )
      }
      {
        isPlaying && (
          <IoIosPause
            className="btn-player-show"
            onClick={() => {
              setIsPlaying(false);
              stop();
            }}
            size={50} color="#fff"
          />
        )
      }
      <audio
        onEnded={() => setIsPlaying(false)}
        ref={musicRef}
        src={track}
      />
    </div>
  );
}