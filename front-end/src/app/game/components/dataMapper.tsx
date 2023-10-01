import { useCallback, useEffect, useState } from "react";
import { playerType, statusType } from "./player";
import { ballType } from "./ball";
import { boardType } from "./board";
import { Socket, io } from "socket.io-client";


export function PlayerPosition(direction:string) : boolean{
  const [arrowDirection, setArrowDirection] = useState(false);
  const handleKeyDown = useCallback((event:KeyboardEvent) => {
    if (event.key === direction) {
      setArrowDirection(true);
    }
  }, [direction]);

  const handleKeyUp = useCallback(() => {
    setArrowDirection(false);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);
  return (arrowDirection);
}

export const socketEventListener = async (socket: Socket, room: string) =>   {
  
  if (!socket.hasListeners('connect')){
    socket.on('connect', () => {
      socket.emit('joinGame', room);
      status.name = 'startGame';
      player1.nmPl = socket.id;
    });
  };

  if (!socket.hasListeners('disconnect')){
    
  }

  if (!socket.hasListeners('joinedGame')){
    socket.on('joinedGame', (id:string,nbPl:number) => {
      console.log(id+" "+nbPl);
      player1.nmPl = id;
      if (nbPl == 2) 
        socket.emit('startGame', room);
      console.log(status);
    })
  }

  if (!socket.hasListeners('startGame')){
    socket.on('startGame',(data)=>{
      const parsedData = JSON.parse(data);
      if(parsedData.plyrs[0].nmPl == player1.nmPl)
        player2.nmPl = parsedData.plyrs[1].nmPl;
      else
        player2.nmPl = parsedData.plyrs[0].nmPl;
      status.name = 'updateGame';});
  }

  socket.on('updateGame', data => {
      const parsedData = JSON.parse(data);
      ballEntity.position[0] = parsedData.ball.posi[0];
      ballEntity.position[1] = parsedData.ball.posi[1];
      if (player1.nmPl == parsedData.plyrs[0].nmPl){
        player1.posi[0] = parsedData.plyrs[0].posi[0];
        player1.posi[1] = parsedData.plyrs[0].posi[1];
      }
      if (player2.nmPl == parsedData.plyrs[1].nmPl){
        player2.posi[0] = parsedData.plyrs[1].posi[0];
        player2.posi[1] = parsedData.plyrs[1].posi[1];
      }
  })
  if (!socket.hasListeners('gameOver')){
    socket.on('gameOver', data => {
      console.log(data);
      socket.emit('leaveGame', room);
      status.name = 'gameOver';
    })
  }
}  
export const room = 'gameRoom';
export const socket =  io('http://localhost:5500');

export const update = (socket:Socket, room: string) => {
    const intervalId = setInterval(() => {
      if (status.name == 'updateGame'){
        socket.emit('update', room );
      }
    }, 1);
    return () => clearInterval(intervalId);
  }
  
  export let player1:playerType = {
    nmPl: 'player1',
    posi: [0,-330,15],
    size: [100,10,30],
    txtu: "red"
  }
  
  export let player2:playerType = {
    nmPl: 'player2',
    posi: [0,330,15],
    size: [100,10,30],
    txtu: "blue"
  }
  
  export let ballEntity:ballType = {
    position:[0,0,20],
    size:[20,15,15],
    color: "white",
  }

  export let boardEntity:boardType = {
    position:[0,0,0],
    size:[600,800],
    color:'green',
  }
  
  export let status:statusType = {
    name: 'connect'
  }