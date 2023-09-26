import Matter from 'matter-js';
interface boardType {
    posi: [number, number, number];
    size: [number, number];
    txtu: string;
}
interface ballType {
    posi: [x: number, y: number, z: number];
    size: [rad: number, w: number, h: number];
    txtu: string;
}
interface playerType {
    nmPl: string;
    posi: [x: number, y: number, z: number];
    size: [width: number, height: number, depth: number];
    txtu: string;
}
export interface gameType {
    ball: ballType;
    plyrs: [p1: playerType, p2: playerType];
    board: boardType;
}
export declare const bdDt: boardType;
export declare const bl: ballType;
export declare const p1: playerType;
export declare const p2: playerType;
export declare let blDt: ballType;
export declare let ply1: playerType;
export declare let ply2: playerType;
export declare let gameData: gameType;
export declare const ballOptions: {
    mass: number;
    force: {
        x: number;
        y: number;
    };
    density: number;
    friction: number;
    restitution: number;
    frictionAir: number;
    inertia: number;
};
export declare const staticOption: {
    isStatic: boolean;
};
export declare const walls: Matter.Body[];
export declare function map_(value: number, inRange: Matter.Vector, outRange: Matter.Vector): number;
export {};
