"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db/db"));
const user_model_1 = __importDefault(require("./user.model"));
const Rols = db_1.default.define('rols', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: { type: sequelize_1.DataTypes.STRING,
        unique: true
    }
}, {
    timestamps: false
});
Rols.hasMany(user_model_1.default, {
    foreignKey: 'Rol_Name',
    sourceKey: 'name'
});
user_model_1.default.belongsTo(Rols, {
    foreignKey: 'Rol_Name',
    targetKey: 'name',
});
exports.default = Rols;
//# sourceMappingURL=rols.model.js.map