import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';
export declare class GameGateway {
    private readonly gameService;
    server: Server;
    constructor(gameService: GameService);
    joinRoom(client: Socket, room: string): void;
    handleLeaveRoom(client: Socket, room: string): void;
    handleMessage(client: Socket, room: string): void;
}
