import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - fetch all speakers
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const isActive = searchParams.get('isActive')
        const limit = searchParams.get('limit')

        const speakers = await prisma.speaker.findMany({
            where: isActive === 'true' ? { isActive: true } : undefined,
            orderBy: [
                { order: 'asc' },
                { createdAt: 'desc' }
            ],
            take: limit ? parseInt(limit) : undefined
        })

        return NextResponse.json({ speakers })
    } catch (error) {
        console.error('Error fetching speakers:', error)
        return NextResponse.json({ error: 'Failed to fetch speakers' }, { status: 500 })
    }
}

// POST - create new speaker
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, title, description, imageUrl, order } = body

        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 })
        }

        const speaker = await prisma.speaker.create({
            data: {
                name,
                title,
                description,
                imageUrl,
                order: order || 0
            }
        })

        return NextResponse.json({ speaker }, { status: 201 })
    } catch (error) {
        console.error('Error creating speaker:', error)
        return NextResponse.json({ error: 'Failed to create speaker' }, { status: 500 })
    }
}
