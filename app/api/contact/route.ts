import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        const submissions = await prisma.contactSubmission.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json(submissions)
    } catch (error) {
        console.error('Error fetching contact submissions:', error)
        return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, phone, subject, message } = body

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required' },
                { status: 400 }
            )
        }

        const submission = await prisma.contactSubmission.create({
            data: {
                name,
                email,
                phone: phone || null,
                subject: subject || null,
                message
            }
        })

        return NextResponse.json(submission, { status: 201 })
    } catch (error) {
        console.error('Error creating contact submission:', error)
        return NextResponse.json({ error: 'Failed to submit message' }, { status: 500 })
    }
}
