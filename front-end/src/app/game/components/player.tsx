import { Box } from "@react-three/drei"
import { Component, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PlayerPosition, player1, player2, room, socket } from "./dataMapper";
import { Body } from "matter-js";

export interface playerType {
    nmPl: string,
    posi: [x:number, y:number, z:number]
    size: [length:number, width:number, height:number]
    txtu: string
}

export interface statusType {
    name: string
}
export function Player(playerProps:playerType)  {
    const player = useRef<THREE.Mesh>(null);
    const arrowLeft = PlayerPosition('ArrowLeft');
    const arrowRight = PlayerPosition('ArrowRight');
    const aLeft = PlayerPosition('a');
    const dRight = PlayerPosition('d');
    
    useFrame(()=>{
        if (player.current){
            player.current.position.x = playerProps.posi[0];
            player.current.position.y = playerProps.posi[1];
            player.current.position.z = playerProps.posi[2];
        }  
    })
    useEffect(()=>{
        const intervalId = setInterval(() => {
            if (arrowLeft)
                socket.emit('moveLeft',room,player1.nmPl); 
            if (arrowRight)
                socket.emit('moveRight',room,player1.nmPl);
            if (aLeft)
                socket.emit('moveLeft',room,player2.nmPl);
            if (dRight)
                socket.emit('moveRight',room,player2.nmPl);
          }, 16);
          return () => clearInterval(intervalId);
    })
   
    return (
    <Box ref={player} args={playerProps.size}>
        <meshBasicMaterial color={playerProps.txtu}/>
    </Box>
    )
}

