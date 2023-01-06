"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateJWT_1 = __importDefault(require("../helpers/generateJWT"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const rols_model_1 = __importDefault(require("../models/rols.model"));
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield user_model_1.default.findOne({
                where: {
                    email
                },
            });
            if (!user) {
                return res.status(404).json({
                    msg: "Usuario o contraseña invalidos"
                });
            }
            const validPassword = bcrypt_1.default.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(404).json({
                    msg: "Usuario o contraseña inválido"
                });
            }
            const token = yield (0, generateJWT_1.default)(user.id);
            const { name, lastname, avatar, Rol_Name } = user;
            return res.json({
                user: {
                    name,
                    lastname,
                    avatar,
                    Rol_Name
                },
                token
            });
        });
    }
    jwtValidate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.header("Authorization");
            if (!token) {
                return res.status(401).json({
                    msg: "No hay token de autorización"
                });
            }
            try {
                const { uid } = jsonwebtoken_1.default.verify(token, "SUPER_SECRET_PASSWORD");
                const user = yield user_model_1.default.findByPk(uid);
                if (!user) {
                    return res.status(404).send({
                        "msg": "El usuario no existe"
                    });
                }
                return res.send(true);
            }
            catch (error) {
                return res.status(403).send({
                    "msg": "Token inválido"
                });
            }
        });
    }
    isRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { role } = req.params;
            const token = req.header("Authorization");
            if (!token) {
                return res.status(401).json({
                    msg: "No hay token de autorización"
                });
            }
            try {
                const { uid } = jsonwebtoken_1.default.verify(token, "SUPER_SECRET_PASSWORD");
                const user = yield user_model_1.default.findByPk(uid, {
                    include: rols_model_1.default
                });
                if (!user) {
                    return res.status(404).send({
                        "msg": "El usuario no existe"
                    });
                }
                // Verifica que es un usuario del tipo ROLE de la request
                if (user.Rol_Name == role) {
                    return res.json(true);
                }
                // El role no coincide con el buscado
                return res.status(400).send(false);
            }
            catch (error) {
                return res.status(403).send({
                    "msg": "Token inválido"
                });
            }
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map