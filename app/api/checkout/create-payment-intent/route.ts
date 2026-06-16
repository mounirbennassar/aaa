import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { isValidEmail, isNonEmptyString, sanitizeString } from '@/lib/validation';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Flat price for all courses (confirmed business rule).
const COURSE_PRICE_USD = 480;
const COURSE_PRICE_CENTS = COURSE_PRICE_USD * 100;

export async function POST(request: Request) {
    try {
        // Throttle to prevent order/PaymentIntent spam.
        const ip = getClientIp(request.headers);
        const limit = rateLimit(`payment-intent:${ip}`, 10, 60_000); // 10 / minute / IP
        if (!limit.ok) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
            );
        }

        const body = await request.json();
        const { courseId, customerName, customerEmail, customerPhone } = body;

        // Validate customer input.
        if (
            !isNonEmptyString(courseId, 100) ||
            !isNonEmptyString(customerName, 200) ||
            !isValidEmail(customerEmail) ||
            !isNonEmptyString(customerPhone, 50)
        ) {
            return NextResponse.json(
                { error: 'Missing or invalid customer details' },
                { status: 400 }
            );
        }

        // Never trust a client-supplied course name/price: resolve from the DB.
        const course = await prisma.event.findUnique({ where: { id: courseId } });
        if (!course || !course.isActive) {
            return NextResponse.json(
                { error: 'Course not found' },
                { status: 404 }
            );
        }

        const safeName = sanitizeString(customerName, 200);
        const safeEmail = sanitizeString(customerEmail, 254);
        const safePhone = sanitizeString(customerPhone, 50);

        // Create pending order in database (server-controlled name + amount).
        const order = await prisma.order.create({
            data: {
                courseId: course.id,
                courseName: course.title,
                customerName: safeName,
                customerEmail: safeEmail,
                customerPhone: safePhone,
                amount: COURSE_PRICE_USD,
                currency: 'USD',
                status: 'PENDING',
            },
        });

        // Create Stripe PaymentIntent.
        const paymentIntent = await stripe.paymentIntents.create({
            amount: COURSE_PRICE_CENTS,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                orderId: order.id,
                courseId: course.id,
                courseName: course.title,
                customerEmail: safeEmail,
                customerName: safeName,
                customerPhone: safePhone,
            },
        });

        // Update order with Stripe payment ID.
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
