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
const password_helper_1 = __importDefault(require("../helpers/password.helper"));
const user_model_1 = __importDefault(require("../models/user.model"));
class UserController {
    getAllUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield user_model_1.default.findAll();
            res.json({
                usuarios
            });
        });
    }
    GetUsuarioByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const usuario = yield user_model_1.default.findByPk(id);
            if (!usuario) {
                res.status(404).json({ msg: `No se encontro un usuario con el id ${id}` });
            }
            else {
                res.json(usuario);
            }
        });
    }
    postUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            try {
                body.password = new password_helper_1.default().hash(body.password);
                const user = new user_model_1.default(body);
                yield user.save();
                res.json({
                    msg: 'El usuario se creo con exito',
                    body
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    msg: 'No se pudo crear el usuario'
                });
            }
        });
    }
    putUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { body } = req;
            try {
                const user = yield user_model_1.default.findByPk(id);
                if (body.password) {
                    body.password = new password_helper_1.default().hash(body.password);
                }
                if (body.email) {
                    const exists = yield user_model_1.default.findOne({
                        where: {
                            'email': body.email
                        }
                    });
                    if (exists) {
                        return res.json({
                            msg: 'Ya existe un usuario con el email que quieres actualizar ' + body.email
                        });
                    }
                }
                if (!user) {
                    return res.status(404).json({
                        msg: 'No existe un usuario con el id ' + id
                    });
                }
                yield user.update(body);
                res.json(user);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    msg: 'No se pudo actualizar el usuario'
                });
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map