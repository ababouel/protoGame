import { Box } from "@react-three/drei"
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { PlayerPosition, player1, player2 } from "./dataMapper";

export interface playerType {
    position: [x:number, y:number, z:number]
    size: [length:number, width:number, height:number]
    color: string
}

export interface statusType {
    name: string
}
function Player(playerProps:playerType) {
    const player = useRef<THREE.Mesh>(null);
    useFrame(()=>{
        if (player.current){
            player.current.position.x = playerProps.position[0];
            player.current.position.y = playerProps.position[1];
            player.current.position.z = playerProps.position[2];
        }
    })
    return (
    <Box ref={player} args={playerProps.size}>
        <meshBasicMaterial color={playerProps.color}/>
    </Box>
    )
}


export function Player1() {
    const [ply,setPlayer] = useState<playerType>(player1);
    const arrowLeftPressed = PlayerPosition('ArrowLeft');
    const arrowRightPressed = PlayerPosition('ArrowRight');
    useFrame(()=>{
        if (arrowLeftPressed)
            player1.position[0] -= 2*1.5;
        if (arrowRightPressed)
            player1.position[0] += 2*1.5;
        setPlayer(player1);
})
return <Player {... ply}/>
}


export function Player2() {
    const [ply,setPlayer] = useState<playerType>(player2);
    const arrowLeftPressed = PlayerPosition('a');
    const arrowRightPressed = PlayerPosition('d');
    useFrame(()=>{
        if (arrowLeftPressed)
            player2.position[0] -= 2*1.5;
        if (arrowRightPressed)
            player2.position[0] += 2*1.5;
        setPlayer(player2);
    })
    return <Player {... ply}/>
}