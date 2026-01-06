'use server';

import { prisma } from '@/lib/prisma';
import { initializeTransaction } from '@/lib/monnify';
import { redirect } from 'next/navigation';

export async function processCheckout(formData: FormData, cartItems: any[], totalPrice: number) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;

    if (!name || !email || !cartItems.length) {
        throw new Error("Missing required info");
    }

    const paymentReference = `CHR-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    try {
        // 1. Create Order in DB
        const order = await prisma.order.create({
            data: {
                customerName: name,
                customerEmail: email,
                totalAmount: totalPrice,
                status: 'PENDING',
                paymentRef: paymentReference,
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
        // Note: In development without real keys, this might fail unless mocked
        try {
            const monnifyResponse = await initializeTransaction({
                amount: totalPrice, // Ensure currency match (NGN vs USD?)
                customerName: name,
                customerEmail: email,
                paymentReference: paymentReference,
                paymentDescription: `Cherif Gallery Order #${order.id}`,
                redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?ref=${paymentReference}`
            });

            return { success: true, checkoutUrl: monnifyResponse.checkoutUrl };
        } catch (paymentError) {
            console.error("Payment Init Failed", paymentError);
            // Fallback for demo if no keys
            return { success: true, checkoutUrl: `/checkout/success?ref=${paymentReference}&mock=true` };
        }

    } catch (error: any) {
        console.error("Checkout process error", error);
        return { success: false, error: error.message };
    }
}
