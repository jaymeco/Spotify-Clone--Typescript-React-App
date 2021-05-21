import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../../../services/api';
import { Loading } from '../../components/Loading';
import { usePlayerContext } from '../../Contexts/player';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Banner from './components/Banner';
import './style.css';
import { IoIosPlay, IoIosPause } from 'react-icons/io';

interface IImages {
  url: string;
}

interface ITrack {
  id: string;
  name: string;
  duration_ms: number;
  disc_number: number;
  preview_url: string;
}

interface ITracks {
  items: ITrack[];
}

interface IAlbum {
  images: IImages[];
  name: string;
  release_date?: string;
  id?: string;
  tracks: ITracks;
  total_tracks: number;
}

interface IArtist {
  images: IImages[];
  name: string;
  id: string;
}

export default function ViewAlbum() {
  const params = useParams<{ id: string }>();
  const [artist, setArtist] = useState<IArtist>();
  const [albums, setAlbums] = useState<IAlbum[]>();
  const [album, setAlbum] = useState<IAlbum>();
  const [isLoading, setIsloading] = useState(true);
  const [discs, setDiscs] = useState<number[]>([]);
  const [currentDisc, setCurrentdisc] = useState(1);
  const { setTrack, isPlaying, track, setIsPlaying, play, stop, setInfoTrack } = usePlayerContext();

  useEffect(() => {
    async function getData() {
      try {
        api.defaults.headers['Authorization'] = localStorage.getItem('token')
        const { id } = params;
        const { data } = await api.get(`/album/${id}`);
        setAlbums(data.some_albums.items);
        setArtist(data.artist);
        setAlbum(data.album);
        separeteDiscs(data.album);
        setIsloading(false);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData()
  }, [params]);

  function getTotalTime() {
    let ms = 0;
    album?.tracks.items.map(track => {
      ms += track.duration_ms
    });

    return ms;
  }

  const millisToMinutesAndSeconds = (millis: number) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);

    return `${minutes}:${(Number(seconds) < 10 ? "0" : "")}${seconds}`;
  }

  function separeteDiscs(data: IAlbum) {
    let discsSum = 0;
    let localDiscs: number[] = [];
    data?.tracks.items.map((track: ITrack) => {
      if (discsSum !== track.disc_number) {
        localDiscs.push(track.disc_number);
      }
      discsSum = track.disc_number;
    });
    setDiscs(localDiscs);
  }

  async function playOrStop(Itrack: ITrack) {
    console.log(Itrack);
    if (Itrack?.preview_url) {
      if (isPlaying && Itrack?.preview_url === track) {
        setIsPlaying(false);
        stop();
      } else {
        stop();
        setInfoTrack(
          Object.assign(Itrack, {album: album})
        );
        setTrack(Itrack?.preview_url);
        await play();
        setIsPlaying(true);
      }
    } else {
      alert('Está musica não possui uma demo :(');
    }
  }

  if (isLoading) return <Loading />
  return (
    <>
      <Header />
      <div className="album-container">
        <Banner
          artist_id={artist?.id as string}
          artist_name={artist?.name as string}
          artist_image={artist?.images[0].url as string}
          album_name={album?.name as string}
          album_year={new Date(album?.release_date as string).getFullYear().toString()}
          album_image={album?.images[0].url as string}
          tracks={album?.total_tracks as number}
          total_time={getTotalTime()}
        />
        <div className="tracks-others-container">
          <div className="album-track-container">
            <div className="search-menu">
              <div className="btn-container">
                {
                  discs.map((number, index) => {
                    if (index + 1 === 1) {
                      return (
                        <button type="button"
                          onClick={() => setCurrentdisc(index + 1)}
                          className={`btn-first ${currentDisc === index + 1 ? 'active' : ''}`}
                        >Disco {index + 1}</button>
                      )
                    } else if (index + 1 !== discs.length) {
                      return (
                        <button type="button"
                          onClick={() => setCurrentdisc(index + 1)}
                          className={`btn-middle ${currentDisc === index + 1 ? 'active' : ''}`}
                        >Disco {index + 1}</button>
                      );
                    } else {
                      return (
                        <button type="button"
                          onClick={() => setCurrentdisc(index + 1)}
                          className={`btn-last ${currentDisc === index + 1 ? 'active' : ''}`}
                        >Disco {index + 1}</button>
                      );
                    }
                  })
                }
              </div>
            </div>
            <div className="track-header">
              <h4>Título</h4>
              <h4>Duração</h4>
            </div>
            <ul className="track-list">
              {
                album?.tracks.items.map((item, index) => {
                  if (item.disc_number === currentDisc) {
                    return (
                      <li
                        onClick={() => playOrStop(item)}
                        key={item.id}
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
                          {/* <p>{index + 1}</p> */}
                          <p
                            style={{ color: `${item?.preview_url === track? '#1DB954': '#fff'}` }}
                          >
                            {item.name}
                          </p>
                        </div>
                        <p>{millisToMinutesAndSeconds(item.duration_ms)}</p>
                      </li>
                    );
                  }
                })
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
                albums?.map(album => (
                  <AlbumCard
                    album_id={album.id as string}
                    key={album.id}
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