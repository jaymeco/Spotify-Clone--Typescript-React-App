import Home from './pages/Dashboard/Home';
import './styles/global.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ViewAlbum from './pages/Dashboard/ViewAlbum';
import Artist from './pages/Dashboard/Artist';
import Discography from './pages/Dashboard/Discography';
import FirstPage from './pages/App/FirstPage';
import Player from './pages/components/Player';
import { PlayerContext } from './pages/Contexts/player';
import { useRef, useState, useMemo } from 'react';

function App() {
  // const [] = useMemo();
  const [track, setTrack] = useState('');
  const [isPlaying, setisPlaying] = useState(false);
  const [infoTrack, setInfoTrack] = useState<any>();
  const musicRef = useRef<HTMLAudioElement>();



  const { setIsPlaying, setNewTrack, play, stop } = useMemo(() => {
    return {
      setIsPlaying: (is: boolean) => {
        setisPlaying(is);
      },
      setNewTrack: (str: string) => {
        setTrack(str);
        // setAudio(new Audio(str));
      },
      play: async () => {
        // musicRef.current?.currentTime
        await musicRef.current?.play();
        // audio.play();
      },
      stop: () => {
        musicRef.current?.pause();
        // audio.pause();
      }
    }
  }, [])

  return (
    <PlayerContext.Provider value={{
      track, setTrack: setNewTrack, isPlaying, setIsPlaying,
      play,
      stop,
      setInfoTrack,
    }}>

      <BrowserRouter>
        <Player
          play={play}
          stop={stop}
          infoTrack={infoTrack}
          isPlaying={isPlaying}
          setIsPlaying={setisPlaying}
          setTrack={setTrack}
          track={track}
          musicRef={musicRef}
        />
        <Switch>
          <Route path="/" exact >
            <FirstPage />
          </Route>
          <Route path="/home" exact >
            <Home />
          </Route>
          <Route path="/album/:id" exact >
            <ViewAlbum />
          </Route>
          <Route path="/artist/:id" exact >
            <Artist />
          </Route>
          <Route path="/artist/:id/discography" exact >
            <Discography />
          </Route>
        </Switch>
      </BrowserRouter>
    </PlayerContext.Provider>
  );
}

export default App;
