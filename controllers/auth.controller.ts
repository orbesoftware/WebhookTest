import { Request, Response } from "express";
import User from "../models/user.model";

class AuthController{


    public login(req: Request, res: Response){

        const {email, password} = req.body
    }


}

export default AuthController