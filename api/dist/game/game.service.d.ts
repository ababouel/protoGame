import { GameGateway } from './game.gateway';
export declare class GameService {
    private readonly webSocketGateway;
    private engine;
    private ball;
    private pl1;
    private pl2;
    private gDt;
    constructor(webSocketGateway: GameGateway);
    movePlayer(nmpl: string, direction: string): void;
    getGameData(): any;
}
