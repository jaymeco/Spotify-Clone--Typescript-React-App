import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { api } from "../../../../../services/api";
import { Loading } from "../../../../components/Loading";
import { useAuth } from "./UseAuth";

interface Iprops {
  code: string
}

export function Callback({ code }: Iprops) {

  const accesstoken = useAuth(code);
  const history = useHistory();

  useEffect(() => {
    function setData() {
      if (accesstoken) {
        localStorage.setItem('token', accesstoken);

        localStorage.setItem('generate_token_time', new Date().toDateString());

        api.defaults.headers['Authorization'] = accesstoken
        
        if (localStorage.getItem('token') !== '') {
          history.push('/home');
        }

      }
    }

    setData();
  }, [accesstoken]);


  return (
    <>
      <Loading />
    </>
  )
}