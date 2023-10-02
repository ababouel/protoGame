import {
  WebSocketServer,
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service'; // Import the GameService
import { Inject, forwardRef } from '@nestjs/common';
import { clients, gameDataS1 } from './gameData';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GameGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly gameService: GameService,
  ) {
  }
  
  handleDisconnect(client: Socket) {
    console.log(client.id + " disconnected");
    client.leave("gameRoom");
    
    if (clients[1] == client.id){
      clients[1] = null;
      gameDataS1.nbPl -= 1;
    }
    if(clients[0] == client.id ){
      clients[0] = null;
      gameDataS1.nbPl -= 1;
    }
    console.log("=> "+clients[0]);
    console.log("=> "+clients[1]); 
    this.gameService.stopGame();
  }



  @SubscribeMessage('joinGame')
  joinRoom(client: Socket, room: string) {
    client.join(room);
    console.log(client.id + " connected "+ clients[1]);
    if (clients[0] == null)
      clients[0] = client.id;
    else if (clients[1] == null)
      clients[1] = client.id;
    if ( gameDataS1.nbPl < 2)
      gameDataS1.nbPl += 1; 
    console.log("=> "+clients[0]);
    console.log("=> "+clients[1]);
    console.log(gameDataS1.nbPl);
    this.server.to(room).emit('joinedGame', this.gameService.getGameDataS1());
  }

  @SubscribeMessage('leaveGame')
  leaveRoom(client: Socket, room: string) {
    client.leave(room);
    console.log(client+" disconnected");
   
    this.gameService.stopGame();
    console.log(gameDataS1.nbPl);
  }

  @SubscribeMessage('startGame')
  startGame(client: Socket, room: string){
    this.gameService.startgame();
    console.log("startgame");
    // if (client.id == clients[0])
      this.server.to(room).emit('startGame', this.gameService.getGameDataS1());
    // if (client.id == clients[1])
      // this.server.to(room).emit('startGame', this.gameService.getGameDataS2());
  }
  

  @SubscribeMessage('moveRight')
  moveRight(client:Socket, room:string){
    this.gameService.movePlayer('right',client.id, clients);
    this.server.to(room).emit('updateGame', this.gameService.getGameDataS1());
  }

  @SubscribeMessage('moveLeft')
  moveLeft(client:Socket,room:string){
    this.gameService.movePlayer('left',client.id, clients);
    // if (client.id == this.clients[0])
      this.server.to(room).emit('updateGame', this.gameService.getGameDataS1());
    // if (client.id == this.clients[1])
    //   this.server.to(room).emit('updateGame', this.gameService.getGameDataS2());
  }

  @SubscribeMessage('update')
  gameUpdate(client: Socket,room: string) {
    console.log();
    // if (client.id == this.clients[0])
      this.server.to(room).emit('updateGame', this.gameService.getGameDataS1());
    // if (client.id == this.clients[1])
    //   this.server.to(room).emit('updateGame', this.gameService.getGameDataS2()); 
  }
}
