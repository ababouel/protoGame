import { Plane } from "@react-three/drei";
import React from "react";


export interface boardType{
    position: [x:number,y:number,z:number],
    size: [width:number,height:number]
    color: string
}

export function Board(boardProps:boardType){
    return (
        <Plane position={boardProps.position} args={boardProps.size}>
            <meshBasicMaterial color={boardProps.color}/>
        </Plane>
        )
};