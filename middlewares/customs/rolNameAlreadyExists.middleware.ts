import { NextFunction, Request, Response } from "express";
import Rols from "../../models/rols.model"

async function roleAlreadyExists(role: string = ""){

    const exists = await Rols.findOne({
        where: {
            name: role.toLowerCase()
        }
    });

    if(exists){
        throw new Error(`El rol ${role} ya existe`);
    }
}

export default roleAlreadyExists;