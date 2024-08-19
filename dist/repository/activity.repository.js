"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProgress = exports.getGeneralProgress = exports.getProgress = exports.getAllByUserId = exports.getAll = exports.getById = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getById = async (id) => {
    const sql = "SELECT * FROM activity WHERE id = ?";
    return new Promise((resolve, reject) => {
        connection_1.default.query(sql, [id], (err, result) => {
            if (err) {
                return reject(err.message);
            }
            else {
                resolve({ data: result.length === 0 ? [] : result[0] });
            }
        });
    });
};
exports.getById = getById;
const getAll = async () => {
    const sql = "SELECT * FROM activity";
    return new Promise((resolve, reject) => {
        connection_1.default.query(sql, (err, result) => {
            if (err) {
                return reject(err.message);
            }
            else {
                resolve({ data: result.length === 0 ? [] : result });
            }
        });
    });
};
exports.getAll = getAll;
const getAllByUserId = async (userId) => {
    const sql = `
    SELECT activity.id, activity.name, activity.level, activity.category_id, activity.target_points
    FROM user_progress
    JOIN activity ON user_progress.activity_id = activity.id
    WHERE user_progress.user_id = ?;
  `;
    return new Promise((resolve, reject) => {
        connection_1.default.query(sql, [userId], (err, result) => {
            if (err) {
                return reject(err.message);
            }
            else {
                resolve({ data: result });
            }
        });
    });
};
exports.getAllByUserId = getAllByUserId;
const getProgress = async (id) => {
    const sql = "SELECT * FROM user_progress WHERE id = ?";
    return new Promise((resolve, reject) => {
        connection_1.default.query(sql, [id], (err, result) => {
            if (err) {
                return reject(err.message);
            }
            else {
                const transformedResult = result.map((item) => ({
                    ...item,
                    completed: item.completed === 1,
                }));
                resolve({
                    data: transformedResult.length === 0 ? [] : transformedResult[0],
                });
            }
        });
    });
};
exports.getProgress = getProgress;
const getGeneralProgress = async (id) => {
    const sql = `
    SELECT activity.id AS activity_id, activity.name AS name,
           SUM(CAST(user_progress.completed AS SIGNED)) AS completed_levels,
           COUNT(activity_levels.id) AS total_levels,
           MIN(CASE WHEN user_progress.completed = 0 THEN activity_levels.level END) AS next_level,
           MIN(CASE WHEN user_progress.completed = 0 THEN user_progress.id END) AS next_level_register_id
    FROM users
    JOIN user_progress ON users.id = user_progress.user_id
    JOIN activity_levels ON user_progress.activity_level_id = activity_levels.id
    JOIN activity ON activity_levels.activity_id = activity.id
    WHERE users.id = ?
    GROUP BY activity.id
    ORDER BY activity.id, MIN(activity_levels.level)
  `;
    return new Promise((resolve, reject) => {
        connection_1.default.query(sql, [id], (err, result) => {
            if (err) {
                return reject(err.message);
            }
            else {
                resolve({ data: result });
            }
        });
    });
};
exports.getGeneralProgress = getGeneralProgress;
const updateProgress = async (progress) => {
    const sql = "UPDATE user_progress SET ? WHERE id = ?";
    return new Promise((resolve, reject) => {
        connection_1.default.query(sql, [progress, progress.id], (err, result) => {
            if (err) {
                return reject(err.message);
            }
            else {
                resolve({ msg: result.affectedRows > 0 });
            }
        });
    });
};
exports.updateProgress = updateProgress;
