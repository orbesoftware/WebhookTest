import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import generateToken from "../helpers/generateJWT";
import jwt, { JwtPayload } from "jsonwebtoken";
import Rols from "../models/rols.model";


class AuthController{


    public async login(req: Request, res: Response){

        const {email, password} = req.body


        const user = await User.findOne({
            where:{
                email
            },
        })

        if(!user){
            return res.status(404).json({
                msg: "Usuario o contraseña invalidos"
            })
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword){
            return res.status(404).json({
                msg: "Usuario o contraseña inválido"
            })

        }

        const token = await generateToken(user.id);

        const {name, lastname, avatar, Rol_Name} = user;

        return res.json({
            user:{
                name,
                lastname,
                avatar,
                Rol_Name
            },
            token
        })
    }


    public async jwtValidate(req: Request, res: Response){
        const token = req.header("Authorization");
        
        if(!token){
            return res.status(401).json({
                msg: "No hay token de autorización"
            });
        }

        try {

            const { uid }= jwt.verify( token, "SUPER_SECRET_PASSWORD" );
    
            const user = await User.findByPk(uid);
    
            if(!user){
                return res.status(404).send({
                    "msg": "El usuario no existe"
                })
            }

            return res.send(true)

            
            
        } catch (error) {
            return res.status(403).send({
                "msg": "Token inválido"
            })
        }

        
    }


    public async isRole(req: Request, res: Response){

        const { role } = req.params;

        const token = req.header("Authorization");

        if(!token){
            return res.status(401).json({
                msg: "No hay token de autorización"
            });
        }

        try {

            const { uid }= jwt.verify( token, "SUPER_SECRET_PASSWORD" );
    
            const user = await User.findByPk(uid, {
                include: Rols
            });

            if(!user){
                return res.status(404).send({
                    "msg": "El usuario no existe"
                })
            }
            
            // Verifica que es un usuario del tipo ROLE de la request
            if(user.Rol_Name == role){
                return res.json(true)
            }

            // El role no coincide con el buscado
            return res.status(400).send(false)

            
        } catch (error) {
            return res.status(403).send({
                "msg": "Token inválido"
            })
        }
        
    }


}

export default AuthController