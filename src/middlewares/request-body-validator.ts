import { NextFunction, Request, Response } from "express";
import {ZodSchema} from 'zod';


export default function validatorRequestBody (schema: ZodSchema){
    return function requestBodyValidator(
        req: Request, 
        res: Response, 
        next: NextFunction
    ){

        try{
            schema.parse(req.body);
            next();
        }catch(error: any){
            res.status(400).send("E1 - Informe os campos obrigatórios corretamente. ")
            return
        }

    }
}
