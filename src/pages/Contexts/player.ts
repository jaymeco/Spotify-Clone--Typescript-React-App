import { createContext, useContext } from 'react';

interface IPlayerContext {
  track: string;
  isPlaying: boolean;
  setIsPlaying(is: boolean): void;
  setTrack(track: string): void;
  play(): void;
  stop(): void;
  setInfoTrack(item: any): void;
}

export const PlayerContext = createContext<IPlayerContext>({
  track: '',
  isPlaying: false,
  setTrack: ()=>{},
  setIsPlaying: ()=>{},
  play: ()=>{},
  stop: ()=>{},
  setInfoTrack: ()=>{}
});

export const usePlayerContext = () => useContext(PlayerContext);