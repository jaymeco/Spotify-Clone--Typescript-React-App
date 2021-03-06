import { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { api } from "../../../services/api";
import { Loading } from "../../components/Loading";
import AlbumCard from "../components/AlbumCard";
import Header from "../components/Header";
import './style.css';


interface IImages {
  url: string;
}

interface IAlbum {
  images: IImages[];
  name: string;
  release_date?: string;
  id?: string;
}
interface IArtist {
  name: string;
  id: string;
  images: IImages[];
}
export default function Discography() {
  const params = useParams<{id: string}>();
  const [state, setState] = useState([])
  const [artist, setArtist] = useState<IArtist>()
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(()=> {
    async function getDate() {
      try {
        api.defaults.headers['Authorization'] = localStorage.getItem('token');
        
        const { id } = params;

        const { data } = await api.get(`/artists/albums/${id}`);

        setState(data.albums.items);
        setArtist(data.artist);
        setIsLoading(false);
      } catch (error) {
        if(error.response?.body?.error.message === 'The access token expired'){
          history.push('/');
        }
      }
    }
    getDate();
  }, [])

  if(isLoading) return <Loading/>
  return (
    <>
      <Header />
      <div className="discography-header">
        <img
          src={artist?.images[0].url}
          alt={`Artist - ${artist?.name}`}
        />
        <Link to={`/artist/${artist?.id}`}>{artist?.name}</Link>
      </div>
      <div className="discography-container">
        <div className="discography-row">
          {
            state.map((album: IAlbum) => (
              <AlbumCard
                key={album.id}
                album_id={album.id as string}
                album_image={album.images[0].url}
                album_name={album.name}
                album_year={new Date(album.release_date as string).getFullYear().toString()}
              />
            ))
          }
        </div>
      </div>
    </>
  );
}