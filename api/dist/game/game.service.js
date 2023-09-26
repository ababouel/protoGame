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
const gameData_1 = require("./gameData");
let GameService = class GameService {
    constructor(webSocketGateway) {
        this.webSocketGateway = webSocketGateway;
        this.gDt = gameData_1.gameData;
        this.engine = matter_js_1.Engine.create({ gravity: { x: 0, y: 0 } });
        this.ball = matter_js_1.Bodies.circle(gameData_1.bl.posi[0], gameData_1.bl.posi[1], gameData_1.bl.size[0], gameData_1.ballOptions);
        this.pl1 = matter_js_1.Bodies.rectangle(gameData_1.p1.posi[0], gameData_1.p1.posi[1], gameData_1.p1.size[0], gameData_1.p1.size[1], gameData_1.staticOption);
        this.pl2 = matter_js_1.Bodies.rectangle(gameData_1.p2.posi[0], gameData_1.p2.posi[1], gameData_1.p2.size[0], gameData_1.p2.size[1], gameData_1.staticOption);
        matter_js_1.World.add(this.engine.world, gameData_1.walls);
        matter_js_1.World.add(this.engine.world, [
            this.ball,
            this.pl1,
            this.pl2
        ]);
        matter_js_1.Runner.run(this.engine);
        matter_js_1.Events.on(this.engine, 'beforeUpdate', () => {
            gameData_1.blDt.posi[0] = (0, gameData_1.map_)(this.ball.position.x, { x: 0, y: gameData_1.bdDt.size[0] }, { x: -1, y: 1 });
            gameData_1.blDt.posi[1] = (0, gameData_1.map_)(this.ball.position.y, { x: 0, y: gameData_1.bdDt.size[1] }, { x: -1, y: 1 });
            gameData_1.ply1.posi[0] = (0, gameData_1.map_)(this.pl1.position.x, { x: 0, y: gameData_1.bdDt.size[0] }, { x: -1, y: 1 });
            gameData_1.ply1.posi[1] = (0, gameData_1.map_)(this.pl1.position.y, { x: 0, y: gameData_1.bdDt.size[1] }, { x: -1, y: 1 });
            gameData_1.ply2.posi[0] = (0, gameData_1.map_)(this.pl2.position.x, { x: 0, y: gameData_1.bdDt.size[0] }, { x: -1, y: 1 });
            gameData_1.ply2.posi[1] = (0, gameData_1.map_)(this.pl2.position.y, { x: 0, y: gameData_1.bdDt.size[1] }, { x: -1, y: 1 });
        });
    }
    movePlayer(nmpl, direction) {
        matter_js_1.Events.on(this.engine, 'beforeUpdate', () => {
            if (gameData_1.ply1.nmPl == nmpl) {
                if (direction == 'right' && this.pl1.position.x < gameData_1.bdDt.size[0])
                    this.pl1.position.x += 2 * 1.5;
                if (direction == 'left' && this.pl1.position.x > 0)
                    this.pl1.position.x -= 2 * 1.5;
            }
            if (gameData_1.ply2.nmPl == nmpl) {
                if (direction == 'right' && this.pl2.position.x < gameData_1.bdDt.size[0])
                    this.pl2.position.x += 2 * 1.5;
                if (direction == 'left' && this.pl2.position.x > 0)
                    this.pl2.position.x -= 2 * 1.5;
            }
        });
    }
    getGameData() {
        const data = JSON.stringify(this.gDt);
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