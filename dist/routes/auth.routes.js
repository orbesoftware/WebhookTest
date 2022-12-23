"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const noErrors_middleware_1 = __importDefault(require("../middlewares/noErrors.middleware"));
const router = (0, express_1.Router)();
const controller = new auth_controller_1.default();
router.post('/', controller.login, [
    (0, express_validator_1.check)('email', "Introduce un email").notEmpty(),
    (0, express_validator_1.check)('password', "Introduce una contraseña").notEmpty(),
    noErrors_middleware_1.default
], controller.login);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map