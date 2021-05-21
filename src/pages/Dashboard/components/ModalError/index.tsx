import { IoIosClose } from 'react-icons/io';
import './style.css';
interface IProps {
  isOpen: boolean;
  setIsOpen(state: boolean): void;
}

export default function ModalError ({ isOpen, setIsOpen }: IProps){

  if(isOpen){
    return (
      <div className="modal-error-container">
        <div className="modal-error-body">
          <div>
            <h2>Aviso</h2>
            <IoIosClose
              onClick={()=>setIsOpen(false)}
              className="close-btn"
              size={35}
              color="#fff"
            />
          </div>
          <h3>Essa música não possui uma Demo :(</h3>
        </div>
      </div>
    )
  }else return null;
}