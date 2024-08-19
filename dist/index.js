"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./db/config");
const server_1 = __importDefault(require("./models/server"));
//dotenv.config();
console.log("variables de entorno: ", {
    DB_HOST: config_1.DB_HOST,
    DB_NAME: config_1.DB_NAME,
    DB_PASSWORD: config_1.DB_PASSWORD,
    DB_PORT: config_1.DB_PORT,
});
const server = new server_1.default();
