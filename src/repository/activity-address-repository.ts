import prisma from '../prisma/prisma-client'

export async function createAddress( activityId: string, latitude: number, longitude: number) {

    const address = await prisma.activityAddresses.create({
        data: {
            activitiyId: activityId,
            latitude: latitude,    
            longitude: longitude   
        }
    });
    return address
}

export async function updateAddress(activityId: string, latitude: number, longitude: number){

    const updatedAddress = await prisma.activityAddresses.update({
        where: { activitiyId: activityId },
        data: {
            latitude: latitude,
            longitude: longitude
        }, omit:{
            id: true,
            activitiyId: true
        } 
    });

    return updatedAddress
}
