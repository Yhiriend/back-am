"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.signIn = exports.login = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const time_converter_1 = __importDefault(require("../utils/time-converter"));
const config_1 = require("../db/config");
const EXPIRATION_TIME = (0, time_converter_1.default)(config_1.TOKEN_EXPIRATION_TIME);
const login = async (email, password) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    return new Promise((resolve, reject) => {
        connection_1.default.query(sql, [email], (err, result) => {
            if (err) {
                reject(err.message);
            }
            else {
                let data = {};
                if (result.length === 0) {
                    resolve({ msg: "Invalid Email" });
                }
                else {
                    data = result[0];
                    const userPassword = data.password;
                    bcrypt_1.default.compare(password, userPassword, (err, isMatch) => {
                        if (err) {
                            reject(err.message);
                        }
                        else {
                            if (isMatch) {
                                const token = jsonwebtoken_1.default.sign({
                                    name: data.name,
                                    surname: data.surname,
                                    phone: data.phone,
                                    email: data.email,
                                    address: data.address,
                                    age: data.age,
                                    gender: data.gender,
                                }, process.env.SECRET_KEY, {
                                    expiresIn: EXPIRATION_TIME.toString(),
                                });
                                const dataWithoutPassword = { ...data };
                                delete dataWithoutPassword.password;
                                resolve({ token: token, data: dataWithoutPassword });
                            }
                            else {
                                resolve({ msg: "Invalid Password" });
                            }
                        }
                    });
                }
            }
        });
    });
};
exports.login = login;
const signIn = async (user) => {
    return new Promise((resolve, reject) => {
        bcrypt_1.default
            .hash(user.password, 10)
            .then((hash) => {
            connection_1.default.query("INSERT INTO users SET ?", {
                name: user.name,
                surname: user.surname,
                password: hash,
                email: user.email,
                address: user.address,
                age: user.age,
                gender: user.gender,
                phone: user.phone,
            }, (err, data) => {
                if (err) {
                    reject(err.message);
                }
                else {
                    if (data.affectedRows > 0) {
                        const sqlUserProgress = "INSERT INTO user_progress (activity_level_id, user_id, total_points, completed, last_date) SELECT activity_levels.id AS activity_level_id, ? AS user_id, 0 AS total_points, 0 AS completed, NOW() AS last_date FROM activity_levels INNER JOIN activity ON activity_levels.activity_id = activity.id WHERE activity_levels.id NOT IN (SELECT DISTINCT activity_level_id FROM user_progress WHERE user_id = ?) AND activity_levels.id IS NOT NULL";
                        const userId = data.insertId;
                        connection_1.default.query(sqlUserProgress, [userId, userId], (err, result) => {
                            if (err) {
                                reject(err.message);
                            }
                            else {
                                if (result.affectedRows > 0) {
                                    resolve({ msg: "Successfully registered", data: true });
                                }
                                else {
                                    resolve({ msg: "Registration failed", data: false });
                                }
                            }
                        });
                    }
                    else {
                        resolve({ msg: "Registration failed", data: false });
                    }
                }
            });
        })
            .catch((err) => {
            reject(err.message);
        });
    });
};
exports.signIn = signIn;
const update = async (user, newPassword) => {
    return new Promise((resolve, reject) => {
        connection_1.default.query("SELECT * FROM users WHERE id = ?", [user.id], (err, result) => {
            if (err) {
                reject(err.message);
            }
            else {
                if (result.length === 0) {
                    reject("Invalid user");
                }
                else {
                    const updateData = { ...user };
                    bcrypt_1.default.compare(user.password, result[0].password, (err, isMatch) => {
                        if (err) {
                            reject(err.message);
                        }
                        else {
                            if (isMatch) {
                                if (newPassword) {
                                    bcrypt_1.default.hash(newPassword, 10).then((hash) => {
                                        updateData.password = hash;
                                        connection_1.default.query("UPDATE users SET ? WHERE id = ?", [updateData, user.id], (err, data) => {
                                            if (err) {
                                                reject(err.message);
                                            }
                                            else {
                                                if (data.affectedRows > 0) {
                                                    resolve({ msg: true });
                                                }
                                                else {
                                                    resolve({ msg: false });
                                                }
                                            }
                                        });
                                    });
                                }
                                else {
                                    delete updateData.password;
                                    connection_1.default.query("UPDATE users SET ? WHERE id = ?", [updateData, user.id], (err, data) => {
                                        if (err) {
                                            reject(err.message);
                                        }
                                        else {
                                            if (data.affectedRows > 0) {
                                                resolve({ msg: true });
                                            }
                                            else {
                                                resolve({ msg: false });
                                            }
                                        }
                                    });
                                }
                            }
                            else {
                                resolve({ msg: false });
                            }
                        }
                    });
                }
            }
        });
    });
};
exports.update = update;
