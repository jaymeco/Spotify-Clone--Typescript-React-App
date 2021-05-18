import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../../../services/api';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Banner from './components/Banner';
import './style.css';

interface IFollowers {
  total: number;
}

interface IImages {
  url: string;
}

interface IData {
  id: string;
  followers: IFollowers;
  name: string;
  images: IImages[];
}

interface IAlbum {
  images: IImages[];
  name: string;
  release_date?: string;
  id?: string;
}

interface ITrack {
  album: IAlbum;
  id: string;
  name: string;
  duration_ms: number; 
}

export default function Artist() {
  const params = useParams<{id: string}>();

  const [state, setState] = useState([]);
  const [artist, setArtist] = useState<IData>();
  const [someAlbums, setSomeAlbums] = useState([]);

  useEffect(()=> {
    async function getData() {
      try {
        const { id } = params;
        
        const { data } = await api.get(`/artists/${id}`);

        console.log(data.some_albums);
        setArtist(data.artist)
        setState(data.top_track?.tracks)
        setSomeAlbums(data.some_albums?.items);
      } catch (error) {
        console.log(error.response);
      }

    }
    getData();
  }, [params])

  return (
    <>
      <Header />
      <div className="artist-container">
        {
          artist ? (
            <Banner  
              id={artist?.id as string}
              name={artist?.name as string}
              images={artist?.images as IImages[]}
              followers={artist?.followers as IFollowers}
            />

          ): null
        }
        <div className="popular-others-container">
          <div className="popular-track-container">
            <h1>Músicas Populares</h1>
            <ul className="popular-track-list">
              {
                state.map((track: ITrack, index) => (
                  <li key={track.id}>
                    <div>
                      <p>{index + 1}</p>
                      <img
                        src={track.album.images[0].url}
                        alt={`Album - ${track.album.name}`}
                      />
                      <p>{track.name}</p>
                    </div>
                    <p>{track.duration_ms}</p>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="others-albums">
            <div>
              <h2>Outros álbuns do artista</h2>
              <Link to={`/artist/${artist?.id}/discography`}>DISCOGRAFIA</Link>
            </div>
            <div className="others-container-row">

              {
                someAlbums.map((album: IAlbum) => (
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
        </div>
      </div>
    </>
  );
}