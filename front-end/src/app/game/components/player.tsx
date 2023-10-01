import { Box } from "@react-three/drei"
import { Component, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PlayerPosition, boardEntity, player1, player2, room, socket } from "./dataMapper";
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

function left(player:playerType){
    player.posi[0] -= 6;
    if (player.posi[0] - 60 < -boardEntity.size[0]/2)
        player.posi[0] = -boardEntity.size[0]/2  + 60; 
}

function right(player:playerType){
    player.posi[0] += 6;
    if (player.posi[0] + 60 > boardEntity.size[0]/2)
        player.posi[0] = boardEntity.size[0]/2 - 60;
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
        if (playerProps.nmPl == player1.nmPl) {
            if (arrowLeft){
                left(playerProps);
                socket.emit('moveLeft',room,player1.nmPl);
            }
            if (arrowRight){
                right(playerProps);
                socket.emit('moveRight',room,player1.nmPl);
            }
        }
        if (playerProps.nmPl == player2.nmPl) {
            if (aLeft){
                left(playerProps);
                socket.emit('moveLeft',room,player2.nmPl);
            }
            if (dRight){
                right(playerProps);
                socket.emit('moveRight',room,player2.nmPl);
            }
        }
    });
    return (
    <Box ref={player} args={playerProps.size}>
        <meshBasicMaterial color={playerProps.txtu}/>
    </Box>
    )
}

