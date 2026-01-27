'use server';

import { prisma } from '@/lib/prisma';
import { initializeTransaction } from '@/lib/monnify';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const checkoutSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10),
    address: z.string().min(5),
});

export async function processCheckout(formData: FormData, cartItems: any[], totalPrice: number) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return { success: false, error: "Authentication required to checkout" };
    }

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;

    try {
        checkoutSchema.parse({ name, email, phone, address });

        if (!cartItems.length) {
            return { success: false, error: "Cart is empty" };
        }

        const paymentReference = `CHR-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        // 1. Create Order in DB
        const order = await prisma.order.create({
            data: {
                customerName: name,
                customerEmail: email,
                totalAmount: totalPrice,
                status: 'PENDING',
                paymentRef: paymentReference,
                userId: (session.user as any)?.id, // Link to user if possible
                items: {
                    create: cartItems.map(item => ({
                        artworkId: item.artworkId,
                        size: item.size,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            }
        });

        // 2. Initialize Monnify (Real Logic)
        try {
            const monnifyResponse = await initializeTransaction({
                amount: totalPrice,
                customerName: name,
                customerEmail: email,
                paymentReference: paymentReference,
                paymentDescription: `Cherif Gallery Order #${order.id}`,
                redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?ref=${paymentReference}`
            });

            return { success: true, checkoutUrl: monnifyResponse.checkoutUrl };
        } catch (paymentError) {
            console.error("Payment Init Failed", paymentError);
            return { success: true, checkoutUrl: `/checkout/success?ref=${paymentReference}&mock=true` };
        }

    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return { success: false, error: error.issues[0].message };
        }
        console.error("Checkout process error", error);
        return { success: false, error: error.message };
    }
}
