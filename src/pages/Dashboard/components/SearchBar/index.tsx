import { AiOutlineSearch } from "react-icons/ai";
import './style.css';

export default function SearchBar() {
  return (
    <div className="search-bar">
      <div>
        <AiOutlineSearch size={22} color="#1DB954" />
        <p>Buscar</p>
      </div>
      <input type="text" name="search" placeholder="Digite aqui..." />
    </div>
  );
}