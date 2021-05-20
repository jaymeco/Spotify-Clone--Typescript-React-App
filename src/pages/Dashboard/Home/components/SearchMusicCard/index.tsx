import { Link } from 'react-router-dom';
import { IoIosClose } from 'react-icons/io';
import './style.css';

interface IProps {
  id?: string;
  image?: string;
  name?: string;
  artist?: string;
  artist_id?: string;
  disable?: boolean;
  setSearchData?(search: any[]): void;
}

export default function SearchMusicCard({ artist, artist_id, id, image, name, disable, setSearchData }: IProps) {

  function saveSearch() {
    let search = {
      track: {
        id,
        name,
        image,
        artist,
        artist_id,
      }
    }

    if (localStorage.getItem('recenty_searched')) {
      let recenty_searched = JSON.parse(localStorage.getItem('recenty_searched') as string);
      let trackExists = recenty_searched.map((items: any) => {
        if (items.track !== undefined && items.track?.id === search.track.id) {
          return items;
        }
        return;
      });
      if (!trackExists.length) {
        localStorage.setItem('recenty_searched', JSON.stringify([...recenty_searched, search]));
      }
      return;
    }
    localStorage.setItem('recenty_searched', JSON.stringify([search]));
  }

  function removeSearch() {
    const recenty_searched = JSON.parse(localStorage.getItem('recenty_searched') as string);
    let newRecentySearch = recenty_searched.map((items: any) => {
      if (items.tracks?.id !== id) {
        return items;
      }
    })
    if(setSearchData){
      setSearchData(newRecentySearch);
    }
    localStorage.setItem('recenty_searched', JSON.stringify(newRecentySearch));
  }

  return (
    <div className="card-container-group">
      <Link to={`/album/${id}`} onClick={() => saveSearch()} className="search-music-card-group">
        <img
          src={image || "https://i.scdn.co/image/ab67616d0000b27390acd1669192dc34cae79608"}
          alt={`artista - ${artist}`}
        />
        <div className="content">
          <div>
            <h3 title={name}>{name || 'Iron'}</h3>
            <Link title={artist} to={`/artist/${artist_id}`}>{artist || 'iron Maiden'}</Link>
          </div>
        </div>
      </Link>
      {!disable && (
        <button onClick={() => removeSearch()} className="delete-search">
          <IoIosClose size={25} color="#fff" />
        </button>
      )}
    </div>
  );
}