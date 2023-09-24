import { GameGateway } from './game.gateway';
export interface gameDataType {
    name: string;
    position: [x: number, y: number, z: number];
    size: [rad: number, w: number, h: number];
}
export declare class GameService {
    private readonly webSocketGateway;
    private engine;
    private ball;
    private bw;
    private bh;
    private gameData;
    constructor(webSocketGateway: GameGateway);
    getGameData(): any;
}
