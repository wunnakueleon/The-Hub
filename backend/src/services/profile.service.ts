import { prisma } from "../lib/prisma";
import { AppError } from "../middleware/error-handler";
import { toPublicUser, type PublicUser } from "../lib/serialize";

export async function getProfile(userId: string): Promise<PublicUser> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new AppError(404, "User not found");
  }
  return toPublicUser(user);
}

export async function updateProfile(
  userId: string,
  input: { name: string; bio?: string; github?: string; skills?: string[] },
): Promise<PublicUser> {
  // Only self-editable fields are updated. email and role are deliberately
  // NOT writable here — a user must not be able to change their login email
  // or promote themselves to admin.
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      name: input.name.trim(),
      bio: input.bio?.trim() || null,
      github: input.github?.trim() || null,
      ...(input.skills !== undefined ? { skills: JSON.stringify(input.skills) } : {}),
    },
  });
  return toPublicUser(user);
}
