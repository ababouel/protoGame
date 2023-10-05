import  { Bodies } from 'matter-js';


interface boardType {
      posi:[number,number,number],
      size:[number,number],
      txtu: string
}
export interface ballType {
      posi: [x: number, y: number, z: number],
      size: [rad: number, w: number, h: number],
      txtu: string
}
export interface playerType {
      nmPl: string,
      type: string,
      posi: [x:number, y:number, z:number],
      size:[width:number,height:number,depth:number],
      txtu: string
}
export interface gameType{
      nbPl:number,
      ball:  ballType,
      plyrs: [p1: playerType, p2: playerType],
      board: boardType
}

export const bdDt: boardType = {
    posi:[0,0,0],
    size:[600,800],
    txtu: 'green'
}

export let clients : [string,string] = [null,null];

export const bl: ballType = {
      posi: [bdDt.size[0]/2, bdDt.size[1]/2, 20],
      size: [20,15,15],
      txtu: "white"
}
export const p1: playerType = {
      nmPl:'player1',
      type: 'Home',
      posi: [bdDt.size[0]/2, 70, 15],
      size: [100,10,30],
      txtu: 'red'
}
export const p2: playerType = {
      nmPl: 'player2',
      type: 'Away',
      posi: [bdDt.size[0]/2,bdDt.size[1] - 70,15],
      size: [100,10,30],
      txtu: 'blue'
}

export let blDt: ballType = {
    posi: [bdDt.size[0]/2, bdDt.size[1]/2, 20],
    size: [20,15,15],
    txtu: "white"
}
export let ply2: playerType = {
      nmPl:'',
      type:'Away',
      posi: [bdDt.size[0]/2,bdDt.size[1] - 70, 15],
      size: [100,10,30],
      txtu: 'red'
}
export let ply1: playerType = {
      nmPl: '',
      type:'Home',
      posi: [bdDt.size[0]/2,70,15],
      size: [100,10,30],
      txtu: 'blue'
}


export let gameDataS1: gameType={
      nbPl: 0,
      ball:  blDt,
      plyrs: [ply1,ply2],
      board: bdDt
}



export const ballOptions ={
      mass: 0.2,
      force: { x: 0.0003, y: 0.0005},
      density: 0.001,
      friction: 0,
      restitution: 1,
      frictionAir: 0,
      inertia: Infinity,
}

export const staticOption = {
            isStatic: true,
}

export const walls = [
      Bodies.rectangle(bdDt.size[0] / 2, 0, bdDt.size[0] , 40, { isStatic: true, restitution: 1 }), // Top wall
      Bodies.rectangle(bdDt.size[0] / 2, bdDt.size[1], bdDt.size[0], 40, { isStatic: true, restitution:1 }), // Bottom wall
      Bodies.rectangle(0, bdDt.size[1] / 2, 40, bdDt.size[1], { isStatic: true }), // Left wall
      Bodies.rectangle(bdDt.size[0], bdDt.size[1] / 2, 40, bdDt.size[1], { isStatic: true, restitution: 1 }) // Right wall
];