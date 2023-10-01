import { Inject, Injectable, forwardRef } from '@nestjs/common';
import Matter, {Events, Engine, World, Bodies, Runner, Constraint, Body } from 'matter-js';
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
  }

startgame(){

Events.on(this.engine, 'collisionStart', (event) => {
    event.pairs.forEach((collision) => {
      const ball = collision.bodyA as Body;
      const wall = collision.bodyB as Body;
      if ((ball === this.ball && wall === walls[0]) || (ball == walls[0] && wall == this.ball)) {
        console.log('Collision between Ball and WallPlayer1 detected!');
      }
      if ((ball === this.ball && wall === walls[1]) || (ball == walls[1] && wall == this.ball)) {
        console.log('Collision between Ball and WallPlayer2 detected!');
      }
    });
});

Events.on(this.engine, 'beforeUpdate', ()=>{
      blDt.posi[0] = map_(this.ball.position.x, {x: 0, y: bdDt.size[0]}, {x: -1, y: 1});
      blDt.posi[1] = map_(this.ball.position.y, {x: 0, y: bdDt.size[1]}, {x: -1, y: 1});
      ply1.posi[0] = map_(this.pl1.position.x, {x: 0, y: bdDt.size[0]}, {x: -1, y: 1});
      ply1.posi[1] = map_(this.pl1.position.y, {x: 0, y: bdDt.size[1]}, {x: -1, y: 1});
      ply2.posi[0] = map_(this.pl2.position.x, {x: 0, y: bdDt.size[0]}, {x: -1, y: 1});
      ply2.posi[1] = map_(this.pl2.position.y, {x: 0, y: bdDt.size[1]}, {x: -1, y: 1});
    });

Runner.run(this.engine);
}

stopGame(){
  Runner.stop(Runner.run(this.engine));
}

movePlayer(direction: string, client:string) {
    if (ply1.nmPl == client) 
      this.processDataplayer(this.pl1,direction);
    if (ply2.nmPl == client)
      this.processDataplayer(this.pl2,direction);
}

private processDataplayer(player :Matter.Body, direction:string) {
  if (direction == 'right' && (player.position.x + 60) < bdDt.size[0]){
    Body.setPosition(player,{x:player.position.x + 10, y:player.position.y});
    if (player.position.x + 60 > bdDt.size[0])
      Body.setPosition(player,{x: bdDt.size[0] - 60, y:player.position.y});
  }
  if (direction == 'left' && (player.position.x + 60) > 0){
    Body.setPosition(player,{x:player.position.x - 10, y:player.position.y}); 
    if (player.position.x - 60 < 0)
      Body.setPosition(player,{x: 60, y:player.position.y});
  } 
}

getGameData(): any {
  const data: string = JSON.stringify(this.gDt);
  return (data);
}

}