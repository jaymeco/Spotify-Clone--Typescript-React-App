import { useLocation } from 'react-router-dom';
import { Callback } from './components/Callback';
import './style.css';

const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=da5a077ca1964cdea4d5208e33677126&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000&scope=user-read-private%20user-read-email'

export default function FirstPage() {
  const search = useLocation().search;
  const code = new URLSearchParams(search).get('code');

  
  return (
    !code ? (
      <div className="first-page-container">
        <a href={AUTH_URL}>Entrar</a>
      </div>
    ): <Callback code={code}/>
    
  );
}