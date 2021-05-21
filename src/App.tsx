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
import ProtectedRoute from './routes/protected';

function App() {
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
      },
      play: async () => {
        await musicRef.current?.play();;
      },
      stop: () => {
        musicRef.current?.pause();
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
        <Switch>
          <Route path="/" exact >
            <FirstPage />
          </Route>
          <>
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
            <ProtectedRoute
              path="/home"
              exact
              component={Home}
            />
            <ProtectedRoute

              path="/album/:id"
              exact
              component={ViewAlbum}
            />
            <ProtectedRoute

              path="/artist/:id"
              exact
              component={Artist}
            />
            <ProtectedRoute

              path="/artist/:id/discography"
              exact
              component={Discography}
            />
          </>
        </Switch>
      </BrowserRouter>
    </PlayerContext.Provider>
  );
}

export default App;
