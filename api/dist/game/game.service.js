"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
const common_1 = require("@nestjs/common");
const matter_js_1 = require("matter-js");
const game_gateway_1 = require("./game.gateway");
let GameService = class GameService {
    constructor(webSocketGateway) {
        this.webSocketGateway = webSocketGateway;
        this.bw = 600;
        this.bh = 800;
        this.engine = matter_js_1.Engine.create();
        this.ball = matter_js_1.Bodies.circle(0, 0, 20, {
            mass: 1,
            force: { x: 0.5, y: 0.5 },
            density: 0.01,
            friction: 0,
            restitution: 1,
            frictionAir: 0,
            inertia: Infinity,
        });
        const barUP = matter_js_1.Bodies.rectangle(this.bw / 2, 0, this.bw, 20, {
            isStatic: true,
        });
        const barDOWN = matter_js_1.Bodies.rectangle(this.bw / 2, this.bh, this.bw, 20, {
            isStatic: true,
        });
        const barLeft = matter_js_1.Bodies.rectangle(0, this.bh / 2, 20, this.bh, {
            isStatic: true,
        });
        const barRight = matter_js_1.Bodies.rectangle(this.bw, this.bh / 2, 20, this.bh, {
            isStatic: true,
        });
        matter_js_1.World.add(this.engine.world, [
            barUP,
            barLeft,
            barRight,
            barDOWN,
            this.ball,
        ]);
        matter_js_1.Engine.update(this.engine);
    }
    getGameData() {
        console.log('PosX=> ' + this.ball.position.x);
        console.log('PosY=> ' + this.ball.position.y);
        const ballPos = this.ball.position;
        this.gameData = {
            name: 'ball',
            position: ballPos,
            size: [20, 15, 15],
        };
        const data = JSON.stringify(this.gameData);
        return data;
    }
};
exports.GameService = GameService;
exports.GameService = GameService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => game_gateway_1.GameGateway))),
    __metadata("design:paramtypes", [game_gateway_1.GameGateway])
], GameService);
//# sourceMappingURL=game.service.js.map