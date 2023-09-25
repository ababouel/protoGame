interface boardType {
      posi:[number,number,number],
      size:[number,number],
      txtu: string
}

interface ballType {
  ball:{
      posi: [x: number, y: number, z: number],
      size: [rad: number, w: number, h: number],
      txtu: string
  }
}
interface playerType {
      nmPl: string,
      posi: [x:number, y:number, z:number],
      size:[width:number,height:number,depth:number],
      txtu: string
}

interface gameType{
  ball:  ballType,
  plyrs: [p1: playerType, p2: playerType],
  board: boardType
}


export let boardData: boardType = {
    posi:[0,0,0],
    size:[600,800],
    txtu: 'green'
}
export let ballData: ballType = {
  ball:{
    posi: [boardData.size[0]/2, boardData.size[1] - 70, 20],
    size: [20,15,15],
    txtu: "white"
  }
}
export let player1: playerType = {
      nmPl:'player1',
      posi: [0,0,0],
      size: [0,0,0],
      txtu: 'red'
}
export let player2: playerType = {
      nmPl: 'player2',
      posi: [0,0,0],
      size: [0,0,0],
      txtu: 'blue'
}

export let gameData: gameType={
  ball:  ballData,
  plyrs: [player1,player2],
  board: boardData
}

