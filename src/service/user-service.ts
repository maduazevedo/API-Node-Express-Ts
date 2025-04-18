import { ServerError } from "../exceptions/server-error";
import { addAchievement } from "../repository/achievements-repository";
import { getActivityTypeById } from "../repository/activity-repository";
import { definePreferences, getAchievementsById, getUser, getUserPreferences } from "../repository/user-repository";
import { deleteUser, getUserByEmail, getUserByPassword, updateImage, updateUser } from "../repository/user-repository";
import bcrypt from 'bcryptjs';

// 3 . GET USER
export async function getUsers(id : string) {

    const user = await getUser(id)

    const achievements = await getAchievementsById(id);
    
    const response = {
        id: user!.id,
        name: user!.name,
        email: user!.email,
        cpf: user!.cpf,
        avatar: user!.avatar,
        xp: user!.xp,
        level: user!.level,
        achievements, 
    };

    return response;
}

// 4 . GET USER/PREFERENCES
export async function getUsersPreferences(id: string) {
    
    const preferences  = getUserPreferences(id)
    return preferences
    
}

// 5. POST USER/PREFERENCES/DEFINE
export async function defineUserPreferences (typeId: string[], id: string) {
    

    const searchId = await getActivityTypeById(typeId)
    if(searchId == false){
        throw new ServerError("Um ou mais IDs informados são inválidos. ", 400)
    }

    return await definePreferences(typeId, id)
}

// 6. UPDATE USER/AVATAR
export async function updateImageService(avatar: string, id: string) {
    const regex = /\.(jpg|png)$/i;
    const result = regex.test(avatar);

    if (!result) {
        throw new ServerError("E2 - A imagem deve ser um arquivo PNG ou JPG.", 400);
    }

    void addAchievement(id, 'Alterar Foto de Perfil');

    return await updateImage(avatar, id);
}

// 7. UPDATE USER/UPDATE
export async function updateUserService(name: string, email: string, password: string,  id: string){
    
    const userExt = await getUserByEmail(email)

    if (userExt || await getUserByPassword(email, password) ) {
        throw new ServerError ("E3 - O email ou CPF informado já pertence a outro usuário. ", 409);
    }
    
    const encryptedPassword = await bcrypt.hash(password, 10);
    password = encryptedPassword;

    const user =  await updateUser(name, email, password, id)
    
    const newUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        avatar: user.avatar,
        xp: user.xp,
        level: user.level
    }
    return newUser
}

// 8. DELETE USER/DEACTIVATE
export async function deleteUsers(id:string) {

    return await deleteUser(id)
}


