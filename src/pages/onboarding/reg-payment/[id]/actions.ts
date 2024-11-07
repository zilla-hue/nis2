'use server';

import { getUser } from '@/lib/lucia';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

export async function createCheckoutSessionAction({
  regId,
}: {
  regId: string;
}) {
  const { user } = await getUser();

  if (!user)
    throw new Error(
      'Unauthorized - you must be logged in to purchase products'
    );

  const product = await prisma.dues.findUnique({ where: { id: regId } });

  if (!product) throw new Error('Product not found');

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      duesId: product.id,
      price: product.price,
    },
  });

  // Create or update membership
  await prisma.membership.upsert({
    where: { userId: order.userId },
    update: {
      duesPaid: { increment: order.price },
      duesDue: { decrement: order.price },
    },
    create: {
      userId: order.userId,
      duesPaid: order.price,
      duesDue: 0,
    },
  });

  // Update the user's reg_paid field
  await prisma.user.update({
    where: { id: order.userId },
    data: {
      membership_status: 'ACTIVE',
      role: 'MEMBER',
      reg_paid: true,
    },
  });

  // it's gonna prefill the email for the user
  const customer = await stripe.customers.create({
    email: user.email!,
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'gbp',
          product_data: {
            name: product.name,
          },
          unit_amount: product.price,
        },
        quantity: 1,
      },
    ],
    metadata: {
      orderId: order.id,
    },
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/reg-payment/${product.id}`,
    customer: customer.id,
    // expires at 30 minutes(min value is 30 minutes)
    expires_at: Math.floor(Date.now() / 1000) + 60 * 30,
  });

  return { url: session.url };
}
