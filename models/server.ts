import express, { Application } from 'express';
import db from '../db/db';
import cors from "cors";
import userRoutes from "../routes/user.routes"
import authRoutes from "../routes/auth.routes"
class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users',
        auth: '/api/auth',
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.initDB();
        this.middlewares();
        this.sync();
        this.routes();
        
    }

    async sync() {
        await db.sync({ alter: true });
    }


    private async initDB(){
        try {

            await db.authenticate();
            console.log("Database Online");

        } catch (error: any) {
            throw new Error(error);
        }
    }

    middlewares() {
        // Cors
        const corsOptions = {
            credentials: true,
            origin: '*'
        }
        this.app.use(cors(corsOptions));
        this.app.use(express.json());
    }

    public listen(){
        this.app.listen(this.port, () => {
            console.log('Server running at', this.port);
        })
    }

    routes() {
        this.app.use(this.apiPaths.users, userRoutes);
        this.app.use(this.apiPaths.auth, authRoutes);

        }

}

export default Server;