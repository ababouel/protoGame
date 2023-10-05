import { Injectable, forwardRef } from '@nestjs/common';
import Matter, {Events, Engine, World, Bodies, Runner, Constraint, Body, Composite } from 'matter-js';
import { walls,  ballOptions,  bdDt, bl,  gameDataS1, gameType, p1, p2,staticOption} from './gameData';
import { updateBallPosition, updatePlayerS1SPosition } from './utils';

@Injectable()
export class GameService {
  private engine: Engine;
  private ball: Matter.Body;
  private pl1: Matter.Body; 
  private pl2: Matter.Body;
  private gDt: gameType;
  private runner: Runner;
  
  constructor() {
    this.gDt = gameDataS1;
    this.runner = Runner.create();
    this.engine = Engine.create({gravity:{x:0,y:0}});
    this.pl1 = Bodies.rectangle(p1.posi[0],p1.posi[1],p1.size[0],p1.size[1],staticOption);
    this.pl2 = Bodies.rectangle(p2.posi[0],p2.posi[1],p2.size[0],p2.size[1],staticOption);
    this.ball = Bodies.circle(bl.posi[0], bl.posi[1], bl.size[0], ballOptions);
    World.add(this.engine.world, walls);
    World.add(this.engine.world, [
      this.pl1,
      this.pl2
    ]);
  }
  
  startgame() {
    World.add(this.engine.world, this.ball);
    Events.on(this.engine, 'collisionStart', (event) => {
      event.pairs.forEach((collision) => {
        const ball = collision.bodyA as Body;
        const wall = collision.bodyB as Body;
        if ((ball == this.ball && wall == walls[0]) || (ball == walls[0] && wall == this.ball))
          Body.setPosition(this.ball,{x:bl.posi[0], y:bl.posi[1]});
        if ((ball == this.ball && wall === walls[1]) || (ball == walls[1] && wall == this.ball))
          Body.setPosition(this.ball,{x:bl.posi[0], y:bl.posi[1]});
    });
  });
  Events.on(this.engine, 'beforeUpdate', ()=>{
    updateBallPosition(this.ball);
    updatePlayerS1SPosition(this.pl1,this.pl2);
  });
  Runner.start(this.runner,this.engine);
}

stopGame() {
  World.clear(this.engine.world,true);
  World.remove(this.engine.world, this.ball);
  if (this.engine.enabled == true)
    Engine.clear(this.engine);
  if(this.runner.enabled == true)
    Runner.stop(this.runner);
}

movePlayer(direction: string, client:string, clients: [string,string]) {
    if (clients[0] == client) 
      this.processDataplayer(this.pl1,direction);
    if (clients[1] == client)
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
  console.log("ballX=> ",this.gDt.ball.posi[0]);
  console.log("ballY=> ",this.gDt.ball.posi[1]);
  return (data);
}}