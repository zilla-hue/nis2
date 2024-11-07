// members.actions.tsx

"use server";

import { getUser } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { MS, Role } from "@prisma/client";

type MemberArgs = {
  first_name: string;
  last_name: string;
  birth_date: Date;
  email: string;
  phone_number: string;
  role: Role;
  membership_status: MS;
  dues_paid: boolean;
  isSubscribed: boolean;
  isOnboarded: boolean;
  middle_name: string;
  picture: string;
  address: string;
  customerId: string;
  updatedBy: string;
};


export async function updateMemberAction({
  id,
  first_name,
  last_name,
  birth_date,
  email,
  phone_number,
  role,
  membership_status,
  dues_paid,
  isSubscribed,
  isOnboarded,
  middle_name,
  picture,
  address,
  customerId,
}: MemberArgs & { id: string }) {
  const { user } = await getUser();

  if (!user?.id) {
    throw new Error("Unauthorized");
  }

  // Find the member to ensure it exists and belongs to the user
  const member = await prisma.user.findUnique({
    where: { id },
  });

  if (!member) {
    throw new Error("Member not found");
  }


  // Update the member data
  const updatedMember = await prisma.user.update({
    where: { id },
    data: {
      first_name,
      last_name,
      birth_date,
      email,
      phone_number,
      role,
      membership_status,
      dues_paid,
      isSubscribed,
      isOnboarded,
      middle_name,
      picture,
      address,
      customerId,
    },
  });

  return { success: true, member: updatedMember };
}

export async function getMembersAction() {
  const { user } = await getUser();

  if (!user?.id) {
    throw new Error("Unauthorized");
  }

  const members = await prisma.user.findMany({
    where: {
      updatedBy: user.id, // Assuming you have a `createdBy` field to filter members by the user who created them
    },
  });

  return members;
}
