"use client"

import { Canvas } from "@react-three/fiber";
import { CamScene } from "../components/camScene";
import { Ball } from "../components/ball";
import {Player } from "../components/player";
import { Board } from "../components/board";
import { ballEntity, boardEntity, player1, player2, socket, socketEventListener, update } from "../components/dataMapper";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { Vector2 } from "three";
import {  ClosedSystem } from "../engine/engine";
import p2 from "p2";
import { Box } from "@react-three/drei";
import { Walls } from "../components/wall";



export function Scene () {
  const room = 'gameRoom'
  useEffect(()=>{socketEventListener(socket,room);},[]);
  useEffect(()=>{update(socket,room)});
  return (
    <Canvas >
        <CamScene/>
        <Player {... player1}/>
        <Ball {... ballEntity}/>
        <Player {... player2}/>
        <Walls/>
        <Board {... boardEntity}/>        
    </Canvas>);
}

