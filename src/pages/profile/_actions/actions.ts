'use server';

import { UpdateUserProfileParams } from '@/app/api/sign-image/types';
import { getUser } from '@/lib/lucia';
import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import { revalidatePath } from 'next/cache';

// export async function getUserProfileAction() {
//   const { user } = await getUser();

//   if (!user) return null;

//   // Fetch the user profile with all fields
//   const currentUser = await prisma.user.findUnique({
//     where: { id: user.id },
//     select: {
//       first_name: true,
//       last_name: true,
//       phone_number: true,
//       address: true,
//       occupation: true,
//       marital_status: true,
//       nationality: true,
//       email: true,
//       picture: true,
//     },
//   });

//   return currentUser;
// }

export async function getUserProfileAction() {
  const { user } = await getUser();
  if (!user) return null;
  return prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone_number: true,
      picture: true,
      address: true,
      marital_status: true,
      nationality: true,
      occupation: true,
    },
  });
}

export async function updateUserProfileAction(params: UpdateUserProfileParams) {
  const { user } = await getUser();

  if (!user) throw new Error('Unauthorized');

  // Construct the fields to update
  const updatedFields: Partial<User> = {
    first_name: params.first_name,
    last_name: params.last_name,
    phone_number: params.phone,
    address: params.address,
    occupation: params.occupation,
    marital_status: params.marital_status,
    nationality: params.nationality,
    picture: params.image,
  };

  // Update user profile with the provided fields
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: updatedFields,
  });

  revalidatePath('/update-profile');

  return { success: true, user: updatedUser };
}
