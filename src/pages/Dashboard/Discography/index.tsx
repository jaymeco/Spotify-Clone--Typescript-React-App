import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
export default function Discography() {
  const params = useParams<{id: string}>();
  const [state, setState] = useState([])
  const [artist, setArtist] = useState({})
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=> {
    async function getDate() {
      try {
        const { id } = params;

        const { data } = await api.get(`/artists/albums/${id}`);

        setState(data.items);
        setArtist(data.items[0]?.artists[0]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
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
          src={''}
          alt={`Artist - `}
        />
        <Link to="/artist">Iron Maiden</Link>
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