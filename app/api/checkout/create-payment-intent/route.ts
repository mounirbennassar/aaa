import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { courseId, courseName, customerName, customerEmail, customerPhone } = body;

        // Fixed price of $480 for all courses
        const amount = 48000; // Amount in cents

        // Create pending order in database
        const order = await prisma.order.create({
            data: {
                courseId,
                courseName,
                customerName,
                customerEmail,
                customerPhone,
                amount: 480,
                currency: 'USD',
                status: 'PENDING',
            },
        });

        // Create Stripe PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                orderId: order.id,
                courseId,
                courseName,
                customerEmail,
                customerName,
                customerPhone,
            },
        });

        // Update order with Stripe payment ID
        await prisma.order.update({
            where: { id: order.id },
            data: { stripePaymentId: paymentIntent.id },
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
            orderId: order.id,
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        return NextResponse.json(
            { error: 'Failed to create payment intent' },
            { status: 500 }
        );
    }
}
