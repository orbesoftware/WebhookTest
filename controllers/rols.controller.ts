import { Request, Response } from "express";
import Rols from "../models/rols.model";

class RolsController{

    public async newRol(req: Request, res: Response){
        const {body} = req;
        body.name = body.name.toLowerCase();
        
        try {
            
            const role = new Rols(body);
            await role.save()

            res.json({
                msg: `El rol, ${body.name}, fue creado con exito`,
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "No se pudo crear el rol, intente de nuevo."
            })
        }    
    }

}

export default RolsController