import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function addAchievement(
  userId: string,
  achievementName: string,
  activityId?: string
) {

  const achievement = await prisma.achievements.findFirst({
    where: { name: achievementName },
  });

  if (!achievement) {
    return "Achievement não encontrado";
  }

  const user = await prisma.users.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return "Usuário não encontrado";
  }


  if (achievementName === "Check-in na Atividade" && activityId) {

    const newXp = user.xp + 5;
    const newLevel = newXp % 10 === 0 ? user.level + 1 : user.level;

    await prisma.users.update({
      where: { id: userId },
      data: {
        xp: newXp,
        level: newLevel,
      },
    });

    const activity = await prisma.activities.findUnique({
      where: { id: activityId },
    });

    if (activity) {
      const creator = await prisma.users.findUnique({
        where: { id: activity.creatorId },
      });

      if (creator) {
        const newXpCreator = creator.xp + 5;
        const newLevelCreator =
          newXpCreator % 10 === 0 ? creator.level + 1 : creator.level;

        await prisma.users.update({
          where: { id: creator.id },
          data: {
            xp: newXpCreator,
            level: newLevelCreator,
          },
        });
      }
    }
  }

  const existingAchievement = await prisma.userAchievements.findFirst({
    where: {
      userId: userId,
      achievementId: achievement.id,
    },
  });

  if (!existingAchievement) {

    await prisma.userAchievements.create({
      data: {
        userId: userId,
        achievementId: achievement.id,
      },
    });
    return ""
  } else {

    return ""
  }
}
