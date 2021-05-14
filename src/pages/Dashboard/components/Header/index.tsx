import logo from '../../../../assets/images/logo.svg';
import SearchBar from '../SearchBar';
import './style.css';

export default function Header() {
  return (
    <>
      <header className="main-header">
        <div>
          <img src={logo} alt="Logo Spotify" />
          <SearchBar/>          
        </div>
        <h3>Playlists</h3>
      </header>
    </>
  );
}