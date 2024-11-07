'use server';

import { PersonalDetailsFormValues } from '../_components/constants';
import { prisma } from '@/lib/prisma';

export async function onboardUser(
  userId: string,
  data: PersonalDetailsFormValues
) {
  const {
    birth_date,
    gender,
    marital_status,
    address,
    postcode,
    nationality,
    state,
    occupation,
    lga,
    nok_first_name,
    nok_last_name,
    nok_email,
    nok_phone,
    nok_gender,
    nok_nationality,
    nok_address,
    nok_postcode,
  } = data;

  try {
    // Convert birth_date string to Date object
    const birthDateObject = new Date(birth_date);
    // Update user model
    await prisma.user.update({
      where: { id: userId },
      data: {
        birth_date: birthDateObject,
        gender,
        marital_status,
        address,
        postcode,
        nationality,
        state,
        occupation,
        lga,
        isOnboarded: true,
        nok_first_name: nok_first_name,
        nok_last_name: nok_last_name,
        nok_email: nok_email,
        nok_phone: nok_phone,
        nok_gender: nok_gender,
        nok_nationality: nok_nationality,
        nok_address: nok_address,
        nok_postcode: nok_postcode,
      },
    });

    return { success: 'User onboarded successfully!' };
  } catch (error) {
    console.error('Error onboarding user:', error);
    return { error: 'An error occurred while onboarding the user.' };
  }
}
