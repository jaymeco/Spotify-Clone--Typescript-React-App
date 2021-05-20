import { Link } from 'react-router-dom';
import { IoIosClose } from 'react-icons/io';
import './style.css';

interface IProps {
  id?: string;
  image?: string;
  name?: string;
  disable?: boolean;
  setSearchData?(search: any[]): void;
}

export default function SearchArtistCard({ id, image, name, disable, setSearchData }: IProps) {

  function saveSearch() {
    let search = {
      artist: {
        id,
        name,
        image,
      }
    }

    if (localStorage.getItem('recenty_searched')) {
      console.log('será que vai');
      let recenty_searched = JSON.parse(localStorage.getItem('recenty_searched') as string);
      let artistExists = recenty_searched.filter((items: any) => {
        if (items.artist !== undefined && items.artist?.id === search.artist.id) {
          return items;
        }
        return;
      });
      if (!artistExists.length) {
        localStorage.setItem('recenty_searched', JSON.stringify([...recenty_searched, search]));
      }
      return;
    }
    localStorage.setItem('recenty_searched', JSON.stringify([search]));
  }

  function removeSearch() {
    const recenty_searched = JSON.parse(localStorage.getItem('recenty_searched') as string);
    let newRecentySearch = recenty_searched.map((items: any) => {
      if (items.artist?.id !== id) {
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
      <Link to={`/artist/${id}`} onClick={() => saveSearch()} className="search-artist-card-group">
        <img
          src={image || "https://i.scdn.co/image/ab67616d0000b27390acd1669192dc34cae79608"}
          alt={`artista - ${name}`}
        />
        <div className="content">
          <div>
            <h3 title={name}>{name || 'Slipknot'}</h3>
            <p>Artista</p>
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