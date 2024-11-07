'use server';

import { getUser } from '@/lib/lucia';
import { redirect } from 'react-router-dom';

export async function getUserData() {
  const { user } = await getUser();

  if (!user?.id) {
    redirect('/authenticate/sign-in');
  }

  if (!user?.know_your_member) {
    redirect('/onboarding/know-your-member');
  }

  if (user?.isOnboarded) {
    redirect('/');
  }

  return user;
}
