import {
  WebSocketServer,
  WebSocketGateway,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service'; // Import the GameService
import { Inject, forwardRef } from '@nestjs/common';
import { gameData } from './gameData';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GameGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(forwardRef(() => GameService))
    private readonly gameService: GameService,
  ) {}

  @SubscribeMessage('joinGame')
  joinRoom(client: Socket, room: string) {
    client.join(room);
    if (gameData.plyrs[0].nmPl == '')
      gameData.plyrs[0].nmPl = client.id;
    else if (gameData.plyrs[1].nmPl == '')
      gameData.plyrs[1].nmPl = client.id;
    gameData.nbPl += 1; 
    this.server.to(room).emit('joinedGame', client.id,gameData.nbPl);
  }

  @SubscribeMessage('leaveGame')
  leaveRoom(client: Socket, room: string) {
    client.leave(room);
    if (gameData.plyrs[0].nmPl == client.id)
      gameData.plyrs[0].nmPl = '';
    else if (gameData.plyrs[1].nmPl == client.id)
      gameData.plyrs[1].nmPl = '';
    this.gameService.stopGame();
    gameData.nbPl -= 1;
  }

  @SubscribeMessage('startGame')
  startGame(client: Socket, room: string){
    this.gameService.startgame();
    this.server.to(room).emit('startGame', this.gameService.getGameData());
  }
  

  @SubscribeMessage('moveRight')
  moveRight(client:Socket, room:string){
    this.gameService.movePlayer('right',client.id);
    this.server.to(room).emit('updateGame', this.gameService.getGameData());
  }

  @SubscribeMessage('moveLeft')
  moveLeft(client:Socket,room:string){
    this.gameService.movePlayer('left',client.id);
    this.server.to(room).emit('updateGame', this.gameService.getGameData());
  }

  @SubscribeMessage('update')
  gameUpdate(client: Socket,room: string) {
    this.server.to(room).emit('updateGame', this.gameService.getGameData());
  }
}
