import { Box } from "@react-three/drei"
import { Component, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PlayerPosition, closedSys, player1, player2, room, socket } from "./dataMapper";
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
    
    useFrame(()=>{

        if (arrowLeft)
            closedSys.applyForceP1(-1);
        if (arrowRight)
            closedSys.applyForceP1(1);

        if (player.current){
            player.current.position.x = playerProps.posi[0];
            player.current.position.y = playerProps.posi[1];
            player.current.position.z = playerProps.posi[2];
        }
            
        // if (PlayerPosition('a'))
        //     socket.emit('left', player2.nmPl);
        // if (PlayerPosition('d'))
        //     socket.emit('right', player2.nmPl);
        // console.log('playerX=> ' + player1.posi[0]);
        // console.log('playerY=> ' + player1.posi[1]);
    })
    return (
    <Box ref={player} args={playerProps.size}>
        <meshBasicMaterial color={playerProps.txtu}/>
    </Box>
    )
}