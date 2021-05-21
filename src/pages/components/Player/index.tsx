import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
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
  const [isCollapse, setIsCollapse] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState('00:30');

  function toggle() {
    const playPauseBtn = document.getElementById('play-pause-btn');
    const infoTrack = document.getElementById('info-track');
    const playerContainer = document.getElementById('player-container');
    const collapseBtn = document.getElementById('collapse-btn');

    if (playPauseBtn && infoTrack && playerContainer && collapseBtn) {
      if (!isCollapse) {
        playPauseBtn.style.display = 'none';
        infoTrack.style.display = 'none';
        collapseBtn.style.transform = 'rotate(180deg)';
        setIsCollapse(true);
      } else {
        playPauseBtn.style.display = 'flex';
        infoTrack.style.display = 'block';
        collapseBtn.style.transform = 'rotate(0deg)';
        setIsCollapse(false);
      }
    }
  }

  return (
    <div id="player-container" className={
      `${!isCollapse? 'collapse-false': 'collapse-true'}`
      
    }>
      {track ? (
        <>

          <img
            src={
              infoTrack?.album?.images[0]?.url
            }
            alt="Album"
          />

          <div id="info-track">
            <h4 title={infoTrack?.name}>{infoTrack?.name}</h4>
            <Link
              title={infoTrack?.artists[0]?.name}
              to={`/artist/${infoTrack?.artists[0]?.id}`}
            >
              {infoTrack?.artists[0]?.name}
            </Link>
            <div className="audio-player">
              <p className="current-duration">
                {currentTime >= 10 ? "00:" + `00:00${currentTime}`.slice(-2) : `00:0${currentTime}`}
              </p>

              <input
                type="range"
                step={1}
                value={currentTime}
                min={0}
                max={30}
                onChange={(e) => setCurrentTime(Number(e.target.value))}
                className="player-slider"
              />

              <p className="final-duration">
                {totalTime}
              </p>
            </div>
          </div>
          <div id="play-pause-btn">
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
          </div>
        </>
      ) : null}
      <IoIosArrowBack
        id="collapse-btn"
        onClick={() => toggle()}
        size={50} color="#fff"
      />
      <audio
        onEnded={() => setIsPlaying(false)}
        ref={musicRef}
        src={track}
        onTimeUpdate={e => setCurrentTime(musicRef.current?.currentTime.toFixed(0))}
      />
    </div>
  );
}