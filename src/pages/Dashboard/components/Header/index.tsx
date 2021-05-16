import logo from '../../../../assets/images/logo.png';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useHistory } from 'react-router-dom';
import SearchBar from '../SearchBar';
import './style.css';

export default function Header() {
  const navigation = useHistory();

  return (
    <>
      <header 
        className={`main-header 
        ${navigation.location.pathname !== '/home'? 'hide': ''}`}
      >
        <div>
          {
            navigation.location.pathname !== '/home'? (
              <button 
                onClick={()=>navigation.goBack()}
                className="back-button"
              >
                <IoIosArrowBack size={20} color="#fff" />
              </button>
            ): null
          }
          <Link to="/home">
            <img src={logo} alt="Logo Spotify" />
          </Link>
          {
            navigation.location.pathname === '/home'? (
              <SearchBar />
            ): null
          }
        </div>
        <h3>Playlists</h3>
      </header>
    </>
  );
}