'use server';

import { SearchResult, SpouseRequest } from '@/app/api/sign-image/types';
import { prisma } from '@/lib/prisma';

// Search for users who do not have a spouse and match the search query
export async function searchUsersAction(query: string) {
  return prisma.user.findMany({
    where: {
      spouse: null, // Users who do not have a spouse
      OR: [
        { first_name: { contains: query, mode: 'insensitive' } },
        { last_name: { contains: query, mode: 'insensitive' } },
      ],
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true, // Add email to the selected fields
    },
  });
}

// Send a spouse request from the sender to the receiver
export async function sendSpouseRequestAction(
  senderId: string,
  receiverId: string
) {
  try {
    // Ensure the request doesn't already exist
    const existingRequest = await prisma.spouseRequest.findFirst({
      where: {
        senderId,
        receiverId,
        status: 'PENDING',
      },
    });

    if (existingRequest) {
      throw new Error('Spouse request already exists.');
    }

    // Create a new spouse request
    return await prisma.spouseRequest.create({
      data: {
        senderId,
        receiverId,
        status: 'PENDING',
      },
    });
  } catch (error: any) {
    console.error('Error sending spouse request:', error.message);
    throw new Error('Error sending spouse request.');
  }
}

// Retrieve all pending spouse requests for the user
export async function getPendingSpouseRequestsAction(
  userId: string
): Promise<SpouseRequest[]> {
  return await prisma.spouseRequest.findMany({
    where: {
      receiverId: userId,
      status: 'PENDING',
    },
    include: {
      sender: true,
    },
  });
}

// Accept a spouse request
// export async function acceptSpouseRequestAction(requestId: string) {
//   try {
//     // Check if the request exists
//     const request = await prisma.spouseRequest.findUnique({
//       where: {
//         id: requestId,
//       },
//       include: {
//         sender: true,
//         receiver: true,
//       },
//     });

//     if (!request) {
//       throw new Error("Spouse request not found.");
//     }

//     // Update the request status to 'ACCEPTED'
//     await prisma.spouseRequest.update({
//       where: {
//         id: requestId,
//       },
//       data: {
//         status: 'ACCEPTED',
//       },
//     });

//     // Link the sender to the receiver as spouse
//     await prisma.spouse.create({
//       data: {
//         userId: request.receiverId,
//         name: request.sender.first_name + " " + request.sender.last_name,
//         email: request.sender.email,
//         image: request.sender.picture,
//       },
//     });

//     // Optionally: Unlink the sender from the receiver if needed
//     await prisma.spouse.delete({
//       where: {
//         id: request.senderId,
//       },
//     });

//   } catch (error: any) {
//     console.error("Error accepting spouse request:", error.message);
//     throw new Error("Error accepting spouse request.");
//   }
// }

export async function acceptSpouseRequestAction(requestId: string) {
  try {
    const request = await prisma.spouseRequest.findUnique({
      where: { id: requestId },
      include: { sender: true, receiver: true },
    });

    if (!request) {
      throw new Error('Spouse request not found.');
    }

    // Update the request status to 'ACCEPTED'
    await prisma.spouseRequest.update({
      where: { id: requestId },
      data: { status: 'ACCEPTED' },
    });

    // Check if there is already a spouse record for the receiver
    const existingSpouse = await prisma.spouse.findFirst({
      where: { userId: request.receiverId },
    });

    if (existingSpouse) {
      // Optionally handle an existing spouse record for the receiver
      // For example, you could delete it or update the record
      // Uncomment the following lines if you want to delete the existing spouse
      // await prisma.spouse.delete({
      //   where: { id: existingSpouse.id },
      // });
    }

    // Create a spouse record for the accepted request
    await prisma.spouse.create({
      data: {
        userId: request.receiverId,
        name: `${request.sender.first_name} ${request.sender.last_name}`,
        email: request.sender.email,
        image: request.sender.picture,
      },
    });

    // Remove the previous spouse request record
    await prisma.spouseRequest.delete({
      where: { id: requestId },
    });
  } catch (error: any) {
    console.error('Error accepting spouse request:', error.message);
    throw new Error(`Failed to accept the request: ${error.message}`);
  }
}

// Reject a spouse request
export async function rejectSpouseRequestAction(requestId: string) {
  try {
    // Check if the request exists
    await prisma.spouseRequest.update({
      where: {
        id: requestId,
      },
      data: {
        status: 'REJECTED',
      },
    });
  } catch (error: any) {
    console.error('Error rejecting spouse request:', error.message);
    throw new Error('Error rejecting spouse request.');
  }
}

// Unlink a spouse
export async function unlinkSpouseAction(userId: string) {
  try {
    // Find the spouse record linked to the user
    const spouse = await prisma.spouse.findUnique({
      where: {
        userId,
      },
    });

    if (!spouse) {
      throw new Error('Spouse not found.');
    }

    // Remove the link by setting userId to null
    await prisma.spouse.update({
      where: {
        id: spouse.id,
      },
      data: {
        userId: null,
      },
    });

    // Optionally: Delete the spouse record if needed
    await prisma.spouse.delete({
      where: {
        id: spouse.id,
      },
    });
  } catch (error: any) {
    console.error('Error unlinking spouse:', error.message);
    throw new Error('Error unlinking spouse.');
  }
}

// Add getSpouseDetailsAction function
export async function getSpouseDetailsAction(userId: string) {
  // Retrieve the spouse's details based on the user's ID
  const userWithSpouse = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      spouse: true, // Include the spouse details
    },
  });

  if (userWithSpouse?.spouse) {
    return userWithSpouse.spouse;
  }

  throw new Error('Spouse details not found.');
}
