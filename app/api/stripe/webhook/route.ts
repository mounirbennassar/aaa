import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import { escapeHtml } from '@/lib/escape-html';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Helper function to send emails via mock Resend API
async function sendEmail(to: string, subject: string, html: string) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    // If using mock API key, just log the email
    if (apiKey === 're_mock_placeholder' || !apiKey) {
      console.log('📧 Mock Email Sent:');
      console.log('  To:', to);
      console.log('  Subject:', subject);
      console.log('  Content:', html.substring(0, 200) + '...');
      return { success: true, mock: true };
    }

    // Real Resend API call
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || 'AAA Academy <noreply@aaaacademy.com>',
        to: [to],
        subject,
        html,
      }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const error = await response.json();
      console.error('Resend API error:', error);
      return { success: false, error };
    }
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error };
  }
}

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  // Signature verification is mandatory. Without it, anyone could POST a forged
  // "payment succeeded" event and mark orders as paid. For local testing use
  // the Stripe CLI (`stripe listen`) which provides a signing secret.
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set; rejecting webhook.');
    return NextResponse.json(
      { error: 'Webhook not configured' },
      { status: 500 }
    );
  }

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const { orderId, courseName, customerEmail, customerName } = paymentIntent.metadata;

      console.log('💰 Payment succeeded for order:', orderId);

      if (!orderId) break;

      // Idempotency: Stripe can deliver the same event more than once. Only
      // process an order that exists and is not already completed.
      const existingOrder = await prisma.order.findUnique({ where: { id: orderId } });
      if (!existingOrder || existingOrder.status === 'COMPLETED') {
        break;
      }

      await prisma.order.update({
        where: { id: orderId },
        data: { status: 'COMPLETED' },
      });

      // Escape user-supplied values before embedding them into HTML emails.
      const safeName = escapeHtml(customerName);
      const safeCourse = escapeHtml(courseName);
      const safeEmail = escapeHtml(customerEmail);
      const safeOrderId = escapeHtml(orderId);
      const safePaymentId = escapeHtml(paymentIntent.id);

      // Send confirmation email to customer
      await sendEmail(
        customerEmail,
        'Thank You for Your Purchase - AAA Academy',
        `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #13558D 0%, #1e7bc9 100%); padding: 40px; text-align: center;">
            <h1 style="color: white; margin: 0;">Thank You!</h1>
          </div>
          <div style="padding: 40px; background: #f8f9fa;">
            <h2 style="color: #13558D;">Dear ${safeName},</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Thank you for enrolling in <strong>${safeCourse}</strong> at AAA Academy!
            </p>
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #13558D; margin-top: 0;">Order Details</h3>
              <p><strong>Course:</strong> ${safeCourse}</p>
              <p><strong>Amount Paid:</strong> $480.00 USD</p>
              <p><strong>Order ID:</strong> ${safeOrderId}</p>
            </div>
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Our team will contact you shortly with further instructions and course access details.
            </p>
            <p style="font-size: 14px; color: #666; margin-top: 30px;">
              If you have any questions, please don't hesitate to contact us at support@aaaacademy.com
            </p>
          </div>
          <div style="background: #13558D; padding: 20px; text-align: center;">
            <p style="color: white; margin: 0; font-size: 12px;">
              © 2026 AAA Academy. All rights reserved.
            </p>
          </div>
        </div>
        `
      );

      // Send notification to admin
      const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'admin@aaaacademy.com';
      await sendEmail(
        adminEmail,
        `New Course Purchase: ${safeCourse}`,
        `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #dc2626; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">🎉 New Purchase!</h1>
          </div>
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #333;">New Course Enrollment</h2>
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <p><strong>Customer Name:</strong> ${safeName}</p>
              <p><strong>Email:</strong> ${safeEmail}</p>
              <p><strong>Course:</strong> ${safeCourse}</p>
              <p><strong>Amount:</strong> $480.00 USD</p>
              <p><strong>Order ID:</strong> ${safeOrderId}</p>
              <p><strong>Payment ID:</strong> ${safePaymentId}</p>
              <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
        `
      );

      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const { orderId } = paymentIntent.metadata;

      console.log('❌ Payment failed for order:', orderId);

      // Update order status
      if (orderId) {
        await prisma.order.update({
          where: { id: orderId },
          data: { status: 'FAILED' },
        });
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
