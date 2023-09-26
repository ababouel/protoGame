import { Box } from "@react-three/drei"
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export interface playerType {
    nmPl: string,
    posi: [x:number, y:number, z:number]
    size: [length:number, width:number, height:number]
    txtu: string
}

export interface statusType {
    name: string
}
export function Player(playerProps:playerType) {
    const player = useRef<THREE.Mesh>(null);
    
    useFrame(()=>{
        if (player.current){
            player.current.position.x = playerProps.posi[0];
            player.current.position.y = playerProps.posi[1];
            player.current.position.z = playerProps.posi[2];
        }
    })
    
    useEffect(()=>{
    //     if (PlayerPosition('ArrowLeft'))
    //     socket.emit('left', player1.nmPl);
    //   if (PlayerPosition('ArrowRight'))
    //     socket.emit('right', player1.nmPl);
    //   if (PlayerPosition('a'))
    //     socket.emit('left', player2.nmPl);
    //   if (PlayerPosition('d'))
    //     socket.emit('right', player2.nmPl);
    })
    return (
    <Box ref={player} args={playerProps.size}>
        <meshBasicMaterial color={playerProps.txtu}/>
    </Box>
    )
}