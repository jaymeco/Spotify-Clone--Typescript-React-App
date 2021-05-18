import Home from './pages/Dashboard/Home';
import './styles/global.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ViewAlbum from './pages/Dashboard/ViewAlbum';
import Artist from './pages/Dashboard/Artist';
import Discography from './pages/Dashboard/Discography';
import FirstPage from './pages/App/FirstPage';
function App() {
  return (
    <BrowserRouter>
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
  );
}

export default App;
