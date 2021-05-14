import Header from '../components/Header';
import InitialCard from '../components/InitialCard';
import './style.css';

export default function Home() {
  return (
    <>
      <Header/>
      <InitialCard
        album_name="Nights of the Dead, Legacy of the Beast: Live in Mexico City"
        album_url="https://i.scdn.co/image/ab67616d00001e023dd751909cadeef54302b0d8"
        album_year="2020"
        artist="Iron Maiden"
      />
    </>
  );
}