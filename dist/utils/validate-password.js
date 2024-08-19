"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const validatePassword = async (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.compare(password, hash, (err, result) => {
            if (err) {
                reject(err.message);
            }
            else {
                console.log(result);
                resolve(result);
            }
        });
    });
};
exports.validatePassword = validatePassword;
