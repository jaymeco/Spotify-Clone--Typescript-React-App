import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { api } from '../../../services/api';
import { Loading } from '../../components/Loading';
import { usePlayerContext } from '../../Contexts/player';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Banner from './components/Banner';
import { IoIosPlay, IoIosPause } from 'react-icons/io';
import './style.css';
import ModalError from '../components/ModalError';

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
  preview_url?: string;
}

export default function Artist() {
  const params = useParams<{ id: string }>();

  const [state, setState] = useState([]);
  const [artist, setArtist] = useState<IData>();
  const [someAlbums, setSomeAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const { 
    setTrack,
    isPlaying,
    track,
    setIsPlaying,
    play,
    stop,
    setInfoTrack
  } = usePlayerContext();

  useEffect(() => {
    async function getData() {
      try {
        api.defaults.headers['Authorization'] = localStorage.getItem('token');
        const { id } = params;

        const { data } = await api.get(`/artists/${id}`);

        setArtist(data.artist);
        setState(data.top_track?.tracks);
        setSomeAlbums(data.some_albums?.items);
        setIsLoading(false);
      } catch (error) {
        if(error.response?.body?.error.message === 'The access token expired'){
          history.push('/');
        }
      }

    }
    getData();
  }, [params]);

  const millisToMinutesAndSeconds = (millis: number) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);

    return `${minutes}:${(Number(seconds) < 10 ? "0" : "")}${seconds}`;
  }

  function playOrStop(Itrack: ITrack) {
    if (Itrack?.preview_url) {
      if (isPlaying && Itrack?.preview_url === track) {
        setIsPlaying(false);
        stop();
      } else {
        stop();
        setInfoTrack(Itrack);
        setTrack(Itrack?.preview_url);
        play();
        setIsPlaying(true);
      }
    } else {
      setIsOpen(true);
    }
  }

  if (isLoading) return <Loading />;
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

          ) : null
        }
        <div className="popular-others-container">
          <div className="popular-track-container">
            <h1>Músicas Populares</h1>
            <ul className="popular-track-list">
              {
                state.map((item: ITrack, index) => (
                  <li
                    key={item.id} onClick={() => playOrStop(item)}
                  >
                    <div>
                      {
                        isPlaying && item?.preview_url === track ? (
                          <IoIosPause
                            className="btn-player"
                            onClick={() => playOrStop(item)}
                            size={25} color="#fff"
                          />
                        ) : (
                          <IoIosPlay
                            className="btn-player"
                            onClick={() => playOrStop(item)}
                            size={25} color="#fff"
                          />
                        )
                      }
                      {
                        (isPlaying && item?.preview_url === track) ? (
                          <img
                            className="is-playing-img"
                            src="https://open.scdn.co/cdn/images/equaliser-animated-green.73b73928.gif"
                            alt="Is playing gif"
                          />
                        ) : (
                          <p className="track-index">{index + 1}</p>
                        )
                      }
                      <img
                        src={item.album.images[0].url}
                        alt={`Album - ${item.album.name}`}
                      />
                      <p
                        style={{ color: `${item.preview_url === track ? '#1DB954' : '#fff'}` }}
                      >
                        {item.name}
                      </p>
                    </div>
                    <p>{millisToMinutesAndSeconds(item.duration_ms)}</p>
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
        <ModalError
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </>
  );
}