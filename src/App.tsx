import Home from './pages/Dashboard/Home';
import './styles/global.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ViewAlbum from './pages/Dashboard/ViewAlbum';
import Artist from './pages/Dashboard/Artist';
import Discography from './pages/Dashboard/Discography';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" exact >
          <Home/>
        </Route>
        <Route path="/album" exact >
          <ViewAlbum/>
        </Route>
        <Route path="/artist" exact >
          <Artist/>
        </Route>
        <Route path="/artist/discography" exact >
          <Discography/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
