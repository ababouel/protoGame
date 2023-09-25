import { Inject, Injectable, forwardRef } from '@nestjs/common';
import Matter, {Events, Engine, World, Bodies } from 'matter-js';
import { GameGateway } from './game.gateway';
import { Walls,  ballOptions,  bdDt, bl, blDt, gameData, gameType, p1, p2, ply1, ply2, staticOption} from './gameData';

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

    World.add(this.engine.world, [
      Walls,
      this.ball,
      this.pl1,
      this.pl2
    ]);
    
    Engine.update(this.engine);
    Matter.Runner.run(this.engine);
    Events.on(this.engine, 'beforeUpdate', ()=>{
      blDt.posi[0] = this.ball.position.x;
      blDt.posi[1] = this.ball.position.y;
      ply1.posi[0] = this.pl1.position.x;
      ply1.posi[0] = this.pl1.position.y;
      ply2.posi[0] = this.pl2.position.x;
      ply2.posi[0] = this.pl2.position.y;
    });
  }



  getGameData(): any {
    console.log('PosX=> ' + this.ball.position.x);
    console.log('PosY=> ' + this.ball.position.y);
    const ballPos: [number, number, number] = this.ball.position;
    
    const data: string = JSON.stringify(this.gDt);
    return data;
  }
}
