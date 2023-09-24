import { useCallback, useEffect, useState } from "react";
import { playerType, statusType } from "./player";
import { ballType } from "./ball";
import { boardType } from "./board";
import { Socket } from "socket.io-client";



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
      console.log('connected');
      socket.emit('joinGame', room);
      status.name = 'startGame';
    });
  };
  if (!socket.hasListeners('startGame')){
    socket.on('startGame', msg => {
      console.log(msg);
      status.name = 'updateGame';
      console.log(status);
    })
  }
  socket.on('updateGame', data => {
      const parsedData = JSON.parse(data);
      ballEntity.position[0] = parsedData.position.x;
      ballEntity.position[1] = parsedData.position.y;
      status.name = 'updateGame'
      // console.log(parsedData.position[0]);
  })
  if (!socket.hasListeners('gameOver')){
    socket.on('gameOver', data => {
      console.log(data);
      socket.emit('leaveGame', room);
      status.name = 'gameOver';
    })
  }
}  




export const update = (socket:Socket, room: string) => {
  
    const intervalId = setInterval(() => {
      if (status.name == 'updateGame'){
        socket.emit('update', room );
      }
    }, 16);
    return () => clearInterval(intervalId);
}

export let player1:playerType = {
  position: [0,-330,15],
  size: [100,10,30],
  color: "red"
}

export let player2:playerType = {
  position: [0,330,10],
  size: [100,10,30],
  color: "blue"
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