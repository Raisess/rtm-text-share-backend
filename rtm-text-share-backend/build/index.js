"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const ws_1 = require("./ws");
const config_1 = require("./config");
const userInfo_route_1 = __importDefault(require("./routes/userInfo.route"));
const sessionInfo_route_1 = __importDefault(require("./routes/sessionInfo.route"));
const app = express_1.default();
const server = http_1.createServer(app);
const io = require('socket.io')(server);
dotenv_1.default.config();
app.use(cors_1.default());
app.get('/', (req, res) => {
    return res.status(200).json({
        ping: 'pong',
        requested_at: new Date().toLocaleString()
    });
});
app.use('/users', userInfo_route_1.default);
app.use('/sessions', sessionInfo_route_1.default);
ws_1.ws(io);
server.listen(config_1.PORT, () => console.log('running on port:', config_1.PORT));
