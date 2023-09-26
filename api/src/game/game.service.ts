import { Inject, Injectable, forwardRef } from '@nestjs/common';
import Matter, {Events, Engine, World, Bodies, Runner } from 'matter-js';
import { GameGateway } from './game.gateway';
import { walls,  ballOptions,  bdDt, bl, blDt, gameData, gameType, map_, p1, p2, ply1, ply2, staticOption} from './gameData';

@Injectable()
export class GameService {
  private engine: Engine;
  private ball: Matter.Body;
  private pl1: Matter.Body; 
  private pl2: Matter.Body;
  private gDt: gameType;

  constructor(
    @Inject(forwardRef(() => GameGateway))
    private readonly webSocketGateway: GameGateway,
  ) {
    // Create a Matter.js engine
    this.gDt = gameData;
    this.engine = Engine.create({gravity:{x:0,y:0}});
    this.ball = Bodies.circle(bl.posi[0], bl.posi[1], bl.size[0], ballOptions);
    this.pl1 = Bodies.rectangle(p1.posi[0],p1.posi[1],
                      p1.size[0],p1.size[1],staticOption);
    this.pl2 = Bodies.rectangle(p2.posi[0],p2.posi[1],
                        p2.size[0],p2.size[1],staticOption);
    World.add(this.engine.world, walls);
    World.add(this.engine.world, [
      this.ball,
      this.pl1,
      this.pl2
    ]);
    Runner.run(this.engine);
    Events.on(this.engine, 'beforeUpdate', ()=>{
      blDt.posi[0] = map_(this.ball.position.x, {x: 0, y: bdDt.size[0]}, {x: -1, y: 1});
      blDt.posi[1] = map_(this.ball.position.y, {x: 0, y: bdDt.size[1]}, {x: -1, y: 1});
      // console.log("y=> ",blDt.posi[0]);
      // console.log("x=> ",blDt.posi[1]);
      ply1.posi[0] = map_(this.pl1.position.x, {x: 0, y: bdDt.size[0]}, {x: -1, y: 1});
      ply1.posi[1] = map_(this.pl1.position.y, {x: 0, y: bdDt.size[1]}, {x: -1, y: 1});
      ply2.posi[0] = map_(this.pl2.position.x, {x: 0, y: bdDt.size[0]}, {x: -1, y: 1});
      ply2.posi[1] = map_(this.pl2.position.y, {x: 0, y: bdDt.size[1]}, {x: -1, y: 1});
    });
  }

  movePlayer(nmpl: string, direction: string) {
    Events.on(this.engine, 'beforeUpdate',()=>{
      if (ply1.nmPl == nmpl) {
        if (direction == 'right' && this.pl1.position.x < bdDt.size[0])
          this.pl1.position.x += 2 * 1.5;
        if (direction == 'left' && this.pl1.position.x > 0)
          this.pl1.position.x -= 2 * 1.5;
      }  
      if (ply2.nmPl == nmpl) {
        if (direction == 'right' && this.pl2.position.x < bdDt.size[0])
          this.pl2.position.x += 2 * 1.5;
        if (direction == 'left' && this.pl2.position.x > 0)
          this.pl2.position.x -= 2 * 1.5;
      }
    });
  }


  getGameData(): any {
    const data: string = JSON.stringify(this.gDt);
    return data;
  }
}
