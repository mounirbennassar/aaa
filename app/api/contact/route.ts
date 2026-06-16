import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getStaffSession } from '@/lib/auth-helpers'
import { isValidEmail, isNonEmptyString, sanitizeString } from '@/lib/validation'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

// GET - list submissions. Staff only (contains PII: names, emails, phones).
export async function GET() {
    const session = await getStaffSession()
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const submissions = await prisma.contactSubmission.findMany({
            orderBy: { createdAt: 'desc' },
            take: 200,
        })
        return NextResponse.json(submissions)
    } catch (error) {
        console.error('Error fetching contact submissions:', error)
        return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        // Throttle public submissions to curb spam/abuse.
        const ip = getClientIp(request.headers)
        const limit = rateLimit(`contact:${ip}`, 5, 60_000) // 5 / minute / IP
        if (!limit.ok) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
            )
        }

        const body = await request.json()
        const { name, email, phone, subject, message } = body

        if (!isNonEmptyString(name, 200) || !isValidEmail(email) || !isNonEmptyString(message, 5000)) {
            return NextResponse.json(
                { error: 'A valid name, email, and message are required' },
                { status: 400 }
            )
        }

        const submission = await prisma.contactSubmission.create({
            data: {
                name: sanitizeString(name, 200),
                email: sanitizeString(email, 254),
                phone: phone ? sanitizeString(phone, 50) : null,
                subject: subject ? sanitizeString(subject, 300) : null,
                message: sanitizeString(message, 5000),
            },
        })

        return NextResponse.json(submission, { status: 201 })
    } catch (error) {
        console.error('Error creating contact submission:', error)
        return NextResponse.json({ error: 'Failed to submit message' }, { status: 500 })
    }
}
