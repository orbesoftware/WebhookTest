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
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db/db"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const auth_routes_1 = __importDefault(require("../routes/auth.routes"));
const rols_routes_1 = __importDefault(require("../routes/rols.routes"));
class Server {
    constructor() {
        this.apiPaths = {
            users: '/api/users',
            auth: '/api/auth',
            rols: '/api/rols'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.initDB();
        this.middlewares();
        this.sync();
        this.routes();
    }
    sync() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.sync({ alter: true });
        });
    }
    initDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db_1.default.authenticate();
                console.log("Database Online");
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    middlewares() {
        // Cors
        const corsOptions = {
            credentials: true,
            origin: '*'
        };
        this.app.use((0, cors_1.default)(corsOptions));
        this.app.use(express_1.default.json());
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running at', this.port);
        });
    }
    routes() {
        this.app.use(this.apiPaths.users, user_routes_1.default);
        this.app.use(this.apiPaths.auth, auth_routes_1.default);
        this.app.use(this.apiPaths.rols, rols_routes_1.default);
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map