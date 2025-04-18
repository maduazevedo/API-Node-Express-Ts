import { PrismaClient } from '@prisma/client'; 
import { v4 as uuidv4 } from 'uuid';  
import { uploadLocalImage } from '../../service/s3-service';

const prisma = new PrismaClient();

export async function insertData() {
    try {
    // Inserir dados na tabela ActivityTypes
        await prisma.activityTypes.createMany({
        data: [
            { id: uuidv4(), name: 'Yoga', description: 'Prática de atividades físicas focadas no bem-estar mental e físico.', image: await uploadLocalImage("src/public/imgs/yoga.jpg") },
            { id: uuidv4(), name: 'Musculação', description: 'Atividade de fortalecimento muscular usando pesos e exercícios físicos.', image: await uploadLocalImage("src/public/imgs/musculacao.jpg")  },
            { id: uuidv4(), name: 'Corrida', description: 'Atividade de corrida ao ar livre ou em esteiras para melhorar a saúde cardiovascular.',  image: await uploadLocalImage("src/public/imgs/corrida.jpg") },
            { id: uuidv4(), name: 'Natação', description: 'Atividade física realizada em piscinas, promovendo saúde cardiovascular e muscular.',  image: await uploadLocalImage("src/public/imgs/natacao.jpg")  },
            { id: uuidv4(), name: 'Ciclismo', description: 'Atividade física feita em bicicletas, excelente para a saúde das pernas e do coração.', image: await uploadLocalImage("src/public/imgs/ciclismo.jpg")  }
        ]
    });

    // Inserir dados na tabela Achievements
        await prisma.achievements.createMany({
        data: [
            { id: uuidv4(), name: 'Check-in na Atividade', criterion: 'Fazer check-in (confirmar presença) pela primeira vez em uma atividade.' },
            { id: uuidv4(), name: 'Criar Atividade', criterion: 'Criar uma nova atividade pela primeira vez no sistema.' },
            { id: uuidv4(), name: 'Alterar Foto de Perfil', criterion: 'Alterar a foto de perfil pela primeira vez.' }
        ]
    });

    console.log("Dados inseridos com sucesso.");
    } catch (error) {
    console.error("Erro ao inserir dados: ", error);
    } finally {
    await prisma.$disconnect();
    }
}