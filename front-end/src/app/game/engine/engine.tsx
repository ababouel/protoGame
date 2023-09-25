


import { Component } from 'react';
import { PlayerPosition, ballEntity, boardEntity, player1, player2 } from '../components/dataMapper';


import Matter, { Events } from 'matter-js';

export class ClosedSystem  {
    // [x: string]: any;
    private engine: Matter.Engine;
    private ball: Matter.Body;
    private p1: Matter.Body;
    private p2: Matter.Body;
    constructor() {
      // Create an engine
      this.engine = Matter.Engine.create({gravity:{x:0,y:0}});
  
      // Create walls for the closed system
      const wallOptions: Matter.IBodyDefinition = {
        isStatic: true,
       
      };
  
      const wallThickness = 40;
  
      const walls = [
        Matter.Bodies.rectangle(boardEntity.size[0] / 2, 0, boardEntity.size[0] , wallThickness, { isStatic: true }), // Top wall
        Matter.Bodies.rectangle(boardEntity.size[0] / 2, boardEntity.size[1], boardEntity.size[0], wallThickness, { isStatic: true }), // Bottom wall
        Matter.Bodies.rectangle(0, boardEntity.size[1] / 2, wallThickness, boardEntity.size[1], { isStatic: true }), // Left wall
        Matter.Bodies.rectangle(boardEntity.size[0], boardEntity.size[1] / 2, wallThickness, boardEntity.size[1], { isStatic: true }) // Right wall
      ];

      this.p1 = Matter.Bodies.rectangle(boardEntity.size[0] / 2, boardEntity.size[1] - 70, player1.size[0], player1.size[1], {isStatic: true});
      this.p2 = Matter.Bodies.rectangle(boardEntity.size[0] / 2, 70, player2.size[0], player2.size[1], {isStatic: true});
  
      // Add walls to the world
      Matter.World.add(this.engine.world, walls);
  
      // Create a bouncing ball
      this.ball = Matter.Bodies.circle(boardEntity.size[0] / 2, boardEntity.size[1] / 2, 20,  {mass: 0.2, force:{x: 0.001, y: 0.003}, density: 0.001, friction: 0, restitution: 1, frictionAir: 0, inertia:Infinity});
  
      // Add the ball to the world
      Matter.World.add(this.engine.world, [this.ball, this.p1, this.p2]);
  
      // Update the engine to run the simulation
      Matter.Runner.run(this.engine);
      this.updateLoop();
    }

    map_(value: number, inRange: Matter.Vector, outRange: Matter.Vector): number{
        let out: number;

        out = outRange.x + ((outRange.y - outRange.x) / (inRange.y - inRange.x)) * (value - inRange.x);
        return (out);
    }

    getBallPosition(): { x: number; y: number } {
        return {
          x: this.ball.position.x,
          y: this.ball.position.y
        };
      }
    private updateLoop() {
        Events.on(this.engine, 'beforeUpdate', ()=>{
            let x : number = 0, y: number = 0;
            x = this.map_(this.getBallPosition().x, {x: 0, y: boardEntity.size[0]}, {x: -1, y: 1});
            y = this.map_(this.getBallPosition().y, {x: 0, y: boardEntity.size[1]}, {x: -1, y: 1});
            console.log(x, y);
            ballEntity.position[0] = x * boardEntity.size[0] / 2;
            ballEntity.position[1] = y * boardEntity.size[1] / 2;
        })
      }
    }