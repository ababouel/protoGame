"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.map_ = exports.walls = exports.staticOption = exports.ballOptions = exports.gameData = exports.ply2 = exports.ply1 = exports.blDt = exports.p2 = exports.p1 = exports.bl = exports.bdDt = void 0;
const matter_js_1 = require("matter-js");
exports.bdDt = {
    posi: [0, 0, 0],
    size: [600, 800],
    txtu: 'green'
};
exports.bl = {
    posi: [exports.bdDt.size[0] / 2, exports.bdDt.size[1] / 2, 20],
    size: [20, 15, 15],
    txtu: "white"
};
exports.p1 = {
    nmPl: 'player1',
    posi: [exports.bdDt.size[0] / 2, exports.bdDt.size[1] - 70, 15],
    size: [100, 10, 30],
    txtu: 'red'
};
exports.p2 = {
    nmPl: 'player2',
    posi: [exports.bdDt.size[0] / 2, 70, 15],
    size: [100, 10, 30],
    txtu: 'blue'
};
exports.blDt = {
    posi: [exports.bdDt.size[0] / 2, exports.bdDt.size[1] / 2, 20],
    size: [20, 15, 15],
    txtu: "white"
};
exports.ply1 = {
    nmPl: 'player1',
    posi: [exports.bdDt.size[0] / 2, exports.bdDt.size[1] - 70, 15],
    size: [100, 10, 30],
    txtu: 'red'
};
exports.ply2 = {
    nmPl: 'player2',
    posi: [exports.bdDt.size[0] / 2, 70, 15],
    size: [100, 10, 30],
    txtu: 'blue'
};
exports.gameData = {
    ball: exports.blDt,
    plyrs: [exports.ply1, exports.ply2],
    board: exports.bdDt
};
exports.ballOptions = {
    mass: 0.2,
    force: { x: 0.001, y: 0.003 },
    density: 0.001,
    friction: 0,
    restitution: 1,
    frictionAir: 0,
    inertia: Infinity,
};
exports.staticOption = {
    isStatic: true,
};
exports.walls = [
    matter_js_1.Bodies.rectangle(exports.bdDt.size[0] / 2, 0, exports.bdDt.size[0], 40, { isStatic: true }),
    matter_js_1.Bodies.rectangle(exports.bdDt.size[0] / 2, exports.bdDt.size[1], exports.bdDt.size[0], 40, { isStatic: true }),
    matter_js_1.Bodies.rectangle(0, exports.bdDt.size[1] / 2, 40, exports.bdDt.size[1], { isStatic: true }),
    matter_js_1.Bodies.rectangle(exports.bdDt.size[0], exports.bdDt.size[1] / 2, 40, exports.bdDt.size[1], { isStatic: true })
];
function map_(value, inRange, outRange) {
    let out;
    out = outRange.x + ((outRange.y - outRange.x) / (inRange.y - inRange.x)) * (value - inRange.x);
    return (out * inRange.y / 2);
}
exports.map_ = map_;
//# sourceMappingURL=gameData.js.map