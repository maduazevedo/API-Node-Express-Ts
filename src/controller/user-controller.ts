import { Express, Router, Request} from "express";
import {authGuard} from "../middlewares/auth-guard";
import validatorRequestBody from "../middlewares/request-body-validator";
import {preferencesValidator, updateValidator } from "../validations/user-validations";
import { ServerError } from "../exceptions/server-error";
import upload from "../multer/multer";
import { uploadImage } from "../service/s3-service";
import { defineUserPreferences, deleteUsers, getUsers, getUsersPreferences, updateImageService, updateUserService } from "../service/user-service";
import { } from "../service/user-service";


export function userController (server: Express){
    //para passar as rotas
    const router = Router();
    
    router.use(authGuard)

    router.get('/', async (req, res) =>{
        try{

        const id = res.userId as string;
        const user = await getUsers(id);
        res.status(200).send(user);

        }catch(error){
            if (error instanceof ServerError){
                res.status(error.statusCode).send({error: error.message})
                return
            }else{
                res.status(500).send({error: "Erro inesperado. "})
            }
        }
    });


    router.get('/preferences', async (req, res) =>{
        try{
        const id = res.userId as string;
        const preferencesData = await getUsersPreferences(id)
        res.status(200).send(preferencesData);

    }catch(error){
        if (error instanceof ServerError){
            res.status(error.statusCode).send({error: error.message})
            return
        }else{
            res.status(500).send({error: "Erro inesperado. "})
        }
    }
    });

    
    router.post('/preferences/define',  validatorRequestBody(preferencesValidator), async (req: Request, res) =>{
        try{
        const id = res.userId as string;
        const preferences = req.body;
        await defineUserPreferences(preferences, id)
        res.status(200).send({message: 'Preferencias atualizadas com sucesso. '});
        
    }catch(error){
        if (error instanceof ServerError){
            res.status(error.statusCode).send({error: error.message})
            return
        }else{
            res.status(500).send({error: "Erro inesperado. "})
        }
    }
    });


    router.put('/avatar', upload.single("avatar"), async (req: Request, res)=>{
        try{
            const userId = res.userId as string
            const avatar = await uploadImage(req.file!)
            await updateImageService(avatar, userId)
            res.status(200).json({avatar: avatar});

        }catch(error){
            if (error instanceof ServerError){
                res.status(error.statusCode).send({error: error.message})
                return
            }else{
                res.status(500).send({error: "Erro inesperado. "})
            }
        }
        
    });
    

    router.put('/update', validatorRequestBody(updateValidator), async (req: Request, res)=>{

        try{
            const id = res.userId as string;
            const {name, email, password} = req.body;
            const userData = await updateUserService(name, email, password, id)
            res.status(200).send(userData);
            
        }catch(error){
            if (error instanceof ServerError){
                res.status(error.statusCode).send({error: error.message})
                return
            }else{
                res.status(500).send({error: "Erro inesperado. "})
            }
        }
    });

    router.delete('/deactivate', async (req, res) =>{

        try{
            const id = res.userId as string
            await deleteUsers(id)
            res.status(200).send({message: "Conta desativada com sucesso. "});

        }catch(error){
            if (error instanceof ServerError){
                res.status(error.statusCode).send({error: error.message})
                return
            }else{
                res.status(500).send({error: "Erro inesperado. "})
            }
        }
    });

    server.use('/user', router);
}

