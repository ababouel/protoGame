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
    this.server.to(room).emit('joinedGame', client.id);
  }

  @SubscribeMessage('leaveGame')
  leaveRoom(client: Socket, room: string) {
    client.leave(room);

    if (gameData.plyrs[0].nmPl == client.id)
      gameData.plyrs[0].nmPl = '';
    else if (gameData.plyrs[1].nmPl == client.id)
      gameData.plyrs[1].nmPl = ''; 
    // console.log('state=> leaveGame');
  }

  @SubscribeMessage('startGame')
  startGame(client: Socket, room: string){
    this.gameService.startgame();
    this.server.to(room).emit('startGame', 'lets start the game' + client.id);
  }
  

  @SubscribeMessage('moveRight')
  moveRight(client:Socket, room:string){
    this.gameService.movePlayer(room[1], 'right');
    this.server.to(room).emit('updateGame', this.gameService.getGameData());
  }

  @SubscribeMessage('moveLeft')
  moveLeft(client:Socket,room:string){
    this.gameService.movePlayer(room[1], 'left');
    this.server.to(room).emit('updateGame', this.gameService.getGameData());
  }

  @SubscribeMessage('update')
  gameUpdate(client: Socket,room: string) {
    this.server.to(room).emit('updateGame', this.gameService.getGameData());
    // console.log('update');
    // console.log(client.id);
  }
}
