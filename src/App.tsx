import Home from './pages/Dashboard/Home';
import './styles/global.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ViewAlbum from './pages/Dashboard/ViewAlbum';
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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
