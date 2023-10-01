import { Box } from "@react-three/drei"
import { Component, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PlayerPosition, boardEntity, left, player1, player2, right, room, socket, status } from "./dataMapper";
import { Body } from "matter-js";

export interface playerType {
    nmPl: string,
    posi: [x:number, y:number, z:number]
    size: [length:number, width:number, height:number]
    txtu: string
}

export interface statusType {
    name: string,
    nbPl: number
}



export function Player(playerProps:playerType)  {
    const player = useRef<THREE.Mesh>(null);
    const arrowLeft = PlayerPosition('ArrowLeft');
    const arrowRight = PlayerPosition('ArrowRight');
    useFrame(()=>{
        if (player.current){
            player.current.position.x = playerProps.posi[0];
            player.current.position.y = playerProps.posi[1];
            player.current.position.z = playerProps.posi[2];
        }
        if (status.nbPl == 2 ){
            if (arrowLeft){
                left(player1);
                socket.emit('moveLeft',room,player1.nmPl);
            }
            if (arrowRight){
                right(player1);
                socket.emit('moveRight',room,player1.nmPl);
            }
        }
    });
    return (
    <Box ref={player} args={playerProps.size}>
        <meshBasicMaterial color={playerProps.txtu}/>
    </Box>
    )
}

