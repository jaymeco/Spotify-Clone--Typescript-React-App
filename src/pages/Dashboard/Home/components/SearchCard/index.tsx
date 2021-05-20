import { Link } from 'react-router-dom';
import { IoIosClose } from 'react-icons/io';
import './style.css';

interface IProps {
  id?: string;
  image?: string;
  name?: string;
  artist?: string;
  artist_id?: string;
  year?: number;
  type?: string;
  total_tracks?: number;
  total_time?: number;
  disable?: boolean;
  setSearchData?(search: any[]): void;
}

export default function SearchCard({ disable, artist, artist_id, id, image, year, name, total_tracks, total_time, setSearchData }: IProps) {

  function saveSearch() {
    let search = {
      album: {
        id,
        name,
        year,
        image,
        artist,
        artist_id,
        total_time,
        total_tracks,
      }
    }

    if (localStorage.getItem('recenty_searched')) {
      // let albumExists = [];
      let recenty_searched = JSON.parse(localStorage.getItem('recenty_searched') as string);
      let albumExists = recenty_searched.filter((items: any) => {

        if (items.album !== undefined && items.album?.id === search.album.id) {
          return items;
        }
        return;
      });
      if (!albumExists.length) {
        localStorage.setItem('recenty_searched', JSON.stringify([...recenty_searched, search]));
      }
      return;
    }
    localStorage.setItem('recenty_searched', JSON.stringify([search]));
  }

  function removeSearch() {
    const recenty_searched = JSON.parse(localStorage.getItem('recenty_searched') as string);
    let newRecentySearch = recenty_searched.filter((items: any) => {
      if (items.album?.id !== id) {
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
      <Link to={`/album/${id}`} onClick={() => saveSearch()} className="search-card-group">
        <img
          src={image || "https://i.scdn.co/image/ab67616d0000b27390acd1669192dc34cae79608"}
          alt={`artista - ${artist}`}
        />
        <div className="content">
          <div>
            <h3 title={name}>{name || 'Nigths od th death, Legacy'}</h3>
            <p>{total_tracks || 17} músicas • {year || 2020}</p>
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