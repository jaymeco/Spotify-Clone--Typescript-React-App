import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { api } from "../../../../../services/api";
// import SpotifyWebApi from 'spotify-web-api-node';

export function useAuth(code: string){
  const history = useHistory();
  const location = useLocation();
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [expiresIn, setExpiresIn] = useState('');

  useEffect(() => {
    console.log(code);
    async function Auth() {
      try {
        const { data } = await api.post('/login', {
          code
        });
        console.log(data);
        setAccessToken(data?.access_token);
        setRefreshToken(data?.refresh_token);
        setExpiresIn(data?.expires_in);
      } catch (error) {
        console.log(error.response.data?.message);
        console.log(error.response.data?.body);
      }
    }

    Auth();
  }, [code]);

  return accessToken;
}