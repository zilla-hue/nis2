'use server';

import { getUser } from '@/lib/lucia';
import { prisma } from '@/lib/prisma';

type DuesArgs = {
  name: string;
  price: string;
};

export async function addDuesAction({ name, price }: DuesArgs) {
  const { user } = await getUser();

  if (!user?.id && user?.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
  const priceInCents = Math.round(parseFloat(price) * 100);
  const newDues = await prisma.dues.create({
    data: {
      name,
      price: priceInCents,
    },
  });

  return { success: true, dues: newDues };
}

export async function updateDuesAction({
  id,
  name,
  price,
  isArchived,
}: {
  id: string;
  name?: string; // Optional because you might not provide a new name
  price?: string; // Optional because you might not provide a new price
  isArchived?: boolean; // Optional because you might just be toggling this status
}) {
  const { user } = await getUser();

  if (
    (!user?.id && user?.role !== 'ADMIN') ||
    process.env.SUPER_ADMIN_EMAIL === 'info@beicraftltd.com'
  ) {
    throw new Error('Unauthorized');
  }

  // Fetch the current dues
  const dues = await prisma.dues.findUnique({ where: { id } });

  if (!dues) {
    throw new Error('Dues not found');
  }

  // Prepare the update data
  const updateData: { name?: string; price?: number; isArchived?: boolean } =
    {};

  if (name !== undefined) {
    updateData.name = name;
  }
  if (price !== undefined) {
    updateData.price = Math.round(parseFloat(price) * 100); // Convert to cents
  }
  if (isArchived !== undefined) {
    updateData.isArchived = isArchived; // Set the provided archived status
  }

  // Update the dues with the prepared data
  const updatedDues = await prisma.dues.update({
    where: { id },
    data: updateData,
  });

  return { success: true, dues: updatedDues };
}

export async function getDuesAction() {
  const { user } = await getUser();

  if (!user?.id && user?.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }

  const dues = await prisma.dues.findMany({
    where: {
      id: user.id,
    },
  });

  return dues;
}
