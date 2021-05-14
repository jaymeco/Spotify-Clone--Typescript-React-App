import logo from '../../../../assets/images/logo.svg';
import { AiOutlineSearch } from 'react-icons/ai'
import './style.css'

export default function Header() {
  return (
    <>
      <header className="main-header">
        <div>
          <img src={logo} alt="Logo Spotify" />
          <div className="search-bar">
            <div>
              <AiOutlineSearch size={22} color="#1DB954" />
              <p>Buscar</p>
            </div>
            <input type="text" name="search" placeholder="Digite aqui..." />
          </div>
        </div>
        <h3>Playlists</h3>
      </header>
    </>
  );
}