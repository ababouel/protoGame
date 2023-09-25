export interface gameDataType {
    ball:{
      position: [x: number, y: number, z: number],
      size: [rad: number, w: number, h: number],
      color: string
    },
    player:[{
      namePlayer: string,
      position: [x:number, y:number, z:number],
      size:[width:number,height:number,depth:number],
    }],
    boardEntity:{
        position:[number,number,number],
        size:[number,number,number],
        tesxture:string
    }
  }

  