'use server';

import { getUser } from '@/lib/lucia';
import { prisma } from '@/lib/prisma';

type ChildArgs = {
  first_name: string;
  last_name: string;
  birth_date: Date;
};

export async function addChildAction({
  first_name,
  last_name,
  birth_date,
}: ChildArgs) {
  const { user } = await getUser();

  if (!user?.id) {
    throw new Error('Unauthorized');
  }

  const newChild = await prisma.child.create({
    data: {
      first_name,
      last_name,
      birth_date,
      userId: user.id,
    },
  });

  return { success: true, child: newChild };
}

export async function updateChildAction({
  id,
  first_name,
  last_name,
  birth_date,
}: {
  id: string;
  first_name: string;
  last_name: string;
  birth_date: Date;
}) {
  const { user } = await getUser();

  if (!user?.id) {
    throw new Error('Unauthorized');
  }

  // Find the child to ensure it exists and belongs to the user
  const child = await prisma.child.findUnique({
    where: { id },
  });

  if (!child) {
    throw new Error('Child not found');
  }

  if (child.userId !== user.id) {
    throw new Error('Unauthorized');
  }

  // Update the child data
  const updatedChild = await prisma.child.update({
    where: { id },
    data: {
      first_name,
      last_name,
      birth_date,
    },
  });

  return { success: true, child: updatedChild };
}

export async function getChildrenAction() {
  const { user } = await getUser();

  if (!user?.id) {
    throw new Error('Unauthorized');
  }

  const children = await prisma.child.findMany({
    where: {
      userId: user.id,
    },
  });

  return children;
}
