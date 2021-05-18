import { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Loading } from "../../../../components/Loading";
import { useAuth } from "./UseAuth";

interface Iprops {
  code: string
}

export function Callback({ code }: Iprops ) {

  const accesstoken = useAuth(code);
  const history = useHistory()
  useEffect(()=> {
    function setData(){
      if(accesstoken){
        localStorage.setItem('token', accesstoken);
        console.log(accesstoken);
        history.push('/home');

      }
    }

    setData();
  }, [accesstoken])
  return (
    <>
      <Loading/>
    </>
  )
}