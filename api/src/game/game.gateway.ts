import {
  WebSocketServer,
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service'; 
import { clients, gameDataS1 } from './gameData';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GameGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly gameService: GameService) {}
  
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
    this.gameService.stopGame();
  }
  
  @SubscribeMessage('joinGame')
  joinRoom(client: Socket, room: string) {
    client.join(room);
    console.log(client.id + " connected ");
    if (clients[0] == null)
      clients[0] = client.id;
    else if (clients[1] == null)
      clients[1] = client.id;
    if ( gameDataS1.nbPl < 2)
      gameDataS1.nbPl += 1; 
    console.log(gameDataS1.nbPl);
    if (clients[0] != null && clients[1] != null){
      gameDataS1.plyrs[0].nmPl = clients[0];
      gameDataS1.plyrs[1].nmPl = clients[1];
    }
    this.server.to(room).emit('joinedGame', this.gameService.getGameData());
  }

  @SubscribeMessage('leaveGame')
  leaveRoom(client: Socket, room: string) {
    client.leave(room);
    console.log(client+" disconnected");
    this.gameService.stopGame();
  }

  @SubscribeMessage('startGame')
  startGame(client: Socket, room: string){
    this.gameService.startgame();
    console.log("startgame");
    this.server.to(room).emit('startGame', this.gameService.getGameData());
  }
  

  @SubscribeMessage('moveRight')
  moveRight(client:Socket, room:string){
    this.gameService.movePlayer('right',client.id, clients);
    this.server.to(room).emit('updateGame', this.gameService.getGameData());
  }

  @SubscribeMessage('moveLeft')
  moveLeft(client:Socket,room:string){
    this.gameService.movePlayer('left',client.id, clients);
    this.server.to(room).emit('updateGame', this.gameService.getGameData());
  }

  @SubscribeMessage('update')
  gameUpdate(client: Socket,room: string) {
      this.server.to(room).emit('updateGame', this.gameService.getGameData());
  }
}
