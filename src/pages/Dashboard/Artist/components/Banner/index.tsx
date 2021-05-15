import './style.css';

export default function Banner() {
  return (
    <div className="artist-banner">
      <img
        src="https://i.scdn.co/image/6dc0be659ea462b84b9b6485bc20db8dffaa48e2"
        alt={`Artist - `}
      />
      <h1>Iron Maiden</h1>
      <p>6.248.616 ouvintes mensais</p>
    </div>
  );
}