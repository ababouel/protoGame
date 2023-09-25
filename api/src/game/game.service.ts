import { Inject, Injectable, forwardRef } from '@nestjs/common';
import Matter, { Engine, World, Bodies } from 'matter-js';
import { GameGateway } from './game.gateway';
import { gameDataType } from './gameData';

@Injectable()
export class GameService {
  private engine: Engine;
  private ball: Matter.Body;
  private bw: number;
  private bh: number;
  private gameData: gameDataType;

  constructor(
    @Inject(forwardRef(() => GameGateway))
    private readonly webSocketGateway: GameGateway,
  ) {
    // Create a Matter.js engine
    this.bw = 600;
    this.bh = 800;
    this.engine = Engine.create();
    this.ball = Bodies.circle(0, 0, 20, {
      mass: 1,
      force: { x: 0.5, y: 0.5 },
      density: 0.01,
      friction: 0,
      restitution: 1,
      frictionAir: 0,
      inertia: Infinity,
    });
    const barUP = Bodies.rectangle(this.bw / 2, 0, this.bw, 20, {
      isStatic: true,
    });
    const barDOWN = Bodies.rectangle(this.bw / 2, this.bh, this.bw, 20, {
      isStatic: true,
    });
    const barLeft = Bodies.rectangle(0, this.bh / 2, 20, this.bh, {
      isStatic: true,
    });
    const barRight = Bodies.rectangle(this.bw, this.bh / 2, 20, this.bh, {
      isStatic: true,
    });
    World.add(this.engine.world, [
      barUP,
      barLeft,
      barRight,
      barDOWN,
      this.ball,
    ]);
    Engine.update(this.engine);
  }

  getGameData(): any {
    console.log('PosX=> ' + this.ball.position.x);
    console.log('PosY=> ' + this.ball.position.y);
    const ballPos: [number, number, number] = this.ball.position;
    this.gameData = {
      name: 'ball',
      position: ballPos,
      size: [20, 15, 15],
    };
    const data: string = JSON.stringify(this.gameData);
    return data;
  }
}
