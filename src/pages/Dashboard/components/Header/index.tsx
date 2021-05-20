import logo from '../../../../assets/images/logo.png';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useHistory } from 'react-router-dom';
import SearchBar from '../SearchBar';
import './style.css';
import { useCallback, useState } from 'react';
import { api } from '../../../../services/api';

interface IProps {
  setSearchData?([]): void
}

export default function Header({ setSearchData }: IProps) {
  const navigation = useHistory();
  const [value, setValue] = useState('');
  const [type, setType] = useState('album');

  
  const search = useCallback(()=>{
    async function getSearchData() {
      try {
        console.log(type);
        if(value === '') return;
        const { data } = await api.post('/search', {
          search: value,
          type,
        });
        if(setSearchData){
          if(data?.albums){
            setSearchData(data?.albums.items);
          }else if(data?.artists){
            setSearchData(data?.artists.items);
          } else if(data?.tracks){
            setSearchData(data?.tracks.items);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    getSearchData();
  }, [value, type])

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
              <SearchBar
                search={search}
                type={type}
                value={value}
                setType={setType}
                setValue={setValue}
              />
            ): null
          }
        </div>
        <h3>Playlists</h3>
      </header>
    </>
  );
}