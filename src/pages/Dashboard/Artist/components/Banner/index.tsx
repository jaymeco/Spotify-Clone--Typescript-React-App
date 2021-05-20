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

export default function Banner(artist: IData) {

  function formatNumber(number: string){
    return number.replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1.')
  }

  return (
    <div className="artist-banner">
      <img
        src={artist.images[0].url}
        alt={`Artist - ${artist.name}`}
      />
      <h1>{artist.name}</h1>
      <p>{formatNumber(String(artist.followers.total))} ouvintes mensais</p>
    </div>
  );
}