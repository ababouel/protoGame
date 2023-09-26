import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';
export declare class GameGateway {
    private readonly gameService;
    server: Server;
    constructor(gameService: GameService);
    joinRoom(client: Socket, room: string): void;
    leaveRoom(client: Socket, room: string): void;
    moveRight(client: Socket, nmPl: string): void;
    moveLeft(client: Socket, nmPl: string): void;
    gameUpdate(client: Socket, room: string): void;
}
