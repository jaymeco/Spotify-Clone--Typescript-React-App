import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowDown } from 'react-icons/io';
import './style.css';

interface IProps {
  value: string;
  setValue(value: string): void;
  setType(type: string): void;
  type: string;
  search(): void; 
}

export default function SearchBar({ value, setValue, setType, type, search }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(()=>{
    const select = document.getElementById('select');
    window.addEventListener('click', event=>{
      if(event.target !== select){
        setIsOpen(false);
      }
    })
  }, []);
  
  return (
    <div className="search-bar">
      <div>
        <AiOutlineSearch size={22} color="#1DB954" />
        <p>Buscar</p>
      </div>
      <input 
        value={value}
        onChange={event=>{
          setValue(event.target.value);
          search();
        }}
        type="text"
        name="search" 
        placeholder="Digite aqui..." 
      />
      <div className="select-search">
        <span id="select" className="select-box" onClick={()=>setIsOpen(!isOpen)}>
          {type}
          <IoIosArrowDown size={15} color="#fff" />
        </span>
        <ul  className={`options-list ${isOpen? 'show': ''}`}>
          <li onClick={()=>{
            setType('album');
            search();
          }}>Álbum</li>
          <li onClick={()=>{
            setType('artist');
            search();
          }}>Artista</li>
          <li onClick={()=>{
            setType('track');
            search();
          }}>Músicas</li>
        </ul>
      </div>
    </div>
  );
}