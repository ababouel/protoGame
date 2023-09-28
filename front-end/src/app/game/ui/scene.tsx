"use client"

import { Canvas } from "@react-three/fiber";
import { CamScene } from "../components/camScene";
import { Ball } from "../components/ball";
import {Player } from "../components/player";
import { Board } from "../components/board";
import { PlayerPosition, ballEntity, boardEntity, player1, player2, room, socket, socketEventListener, update } from "../components/dataMapper";
import { useEffect } from "react";

import { Walls } from "../components/wall";
import { ClosedSystem } from "../engine/engine";



export function Scene () {
  const left = PlayerPosition('ArrowLeft');
  const right = PlayerPosition('ArrowRight');
  // useEffect(()=>{socketEventListener(socket,room);},[]);
  // useEffect(()=>{update(socket,room)});
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

