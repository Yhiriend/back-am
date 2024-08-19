"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_PASSWORD = exports.DB_USER = exports.DB_NAME = exports.DB_PORT = exports.DB_HOST = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT?.toString() || "3002";
exports.DB_HOST = process.env.HOST_BD || "localhost";
exports.DB_PORT = Number(process.env.PORT_BD) || 3306;
exports.DB_NAME = process.env.NAME_BD; //|| "databasename";
exports.DB_USER = process.env.USER_BD || "root";
exports.DB_PASSWORD = process.env.PASSWORD_BD || "";
