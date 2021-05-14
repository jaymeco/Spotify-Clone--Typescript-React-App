import Home from './pages/Dashboard/Home';
import './styles/global.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" exact >
          <Home/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
