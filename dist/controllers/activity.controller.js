"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGeneralUserProgress = exports.updateUserProgress = exports.getUserProgress = exports.getAllActivityByUserId = exports.getAllActivities = exports.getActivity = void 0;
const ActivityRepository = __importStar(require("../repository/activity.repository"));
const getActivity = async (req, res) => {
    const { id } = req.body;
    try {
        const result = await ActivityRepository.getById(id);
        res.json(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getActivity = getActivity;
const getAllActivities = async (req, res) => {
    try {
        const result = await ActivityRepository.getAll();
        res.json(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getAllActivities = getAllActivities;
const getAllActivityByUserId = async (req, res) => {
    const { id } = req.body;
    try {
        const result = await ActivityRepository.getAllByUserId(id);
        res.json(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getAllActivityByUserId = getAllActivityByUserId;
const getUserProgress = async (req, res) => {
    const { id } = req.body;
    try {
        const result = await ActivityRepository.getProgress(id);
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getUserProgress = getUserProgress;
const updateUserProgress = async (req, res) => {
    const progress = req.body;
    try {
        const result = await ActivityRepository.updateProgress(progress);
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.updateUserProgress = updateUserProgress;
const getGeneralUserProgress = async (req, res) => {
    const { id } = req.body;
    try {
        const result = await ActivityRepository.getGeneralProgress(id);
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.getGeneralUserProgress = getGeneralUserProgress;
