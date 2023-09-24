"use client"

import { Canvas } from "@react-three/fiber";
import { CamScene } from "../components/camScene";
import { Ball } from "../components/ball";
import { Player1, Player2 } from "../components/player";
import { Board } from "../components/board";
import { ballEntity, boardEntity, socketEventListener, update } from "../components/dataMapper";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { Vector2 } from "three";
import {  ClosedSystem } from "../engine/engine";
import p2 from "p2";
import { Box } from "@react-three/drei";

// const socket = io('http://localhost:5500');

export function Scene () {
  // const room = 'gameRoom'
  // useEffect(()=>{socketEventListener(socket,room);},[]);
  // useEffect(()=>{update(socket,room)});
  useEffect(()=>{
   new ClosedSystem();
    // ballEntity.position[0] = closedSystem.getBallPosition().x;
    // ballEntity.position[1] = closedSystem.getBallPosition().y;
    // console.log(closedSystem.getBallPosition().x);
    // console.log(closedSystem.getBallPosition().y);

  })
  return (
    <Canvas >
        <CamScene/>
        <Player1/>
        <Ball {... ballEntity}/>
        <Player2/>
        <Box args={[boardEntity.size[0],20,20]} position={[0,-boardEntity.size[1]/2,10]} >
          <meshBasicMaterial color={ballEntity.color}/>
        </Box>
        <Box args={[boardEntity.size[0],20,20]} position={[0,boardEntity.size[1]/2,10]} >
          <meshBasicMaterial color={ballEntity.color}/>
        </Box>
        <Box args={[20,boardEntity.size[1],20]} position={[boardEntity.size[0]/2,0,10]} >
          <meshBasicMaterial color={ballEntity.color}/>
        </Box>
        <Box args={[20,boardEntity.size[1],20]} position={[-boardEntity.size[0]/2,0,10]} >
          <meshBasicMaterial color={ballEntity.color}/>
        </Box>
        <Board {... boardEntity}/>        
    </Canvas>);
}

