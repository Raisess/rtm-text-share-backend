"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const random_string_1 = __importDefault(require("random-string"));
function shortIdGen() {
    return random_string_1.default({
        length: 8,
        numeric: true,
        letters: false,
        special: false
    });
}
exports.default = shortIdGen;
