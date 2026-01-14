import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const limit = searchParams.get('limit')
        const isActive = searchParams.get('isActive')

        const where: any = {}
        if (isActive) {
            where.isActive = isActive === 'true'
        }

        const testimonials = await prisma.testimonial.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: limit ? parseInt(limit) : undefined,
        })

        return NextResponse.json(testimonials)
    } catch (error) {
        console.error('Error fetching testimonials:', error)
        return NextResponse.json(
            { error: 'Failed to fetch testimonials' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const body = await request.json()
        const { name, role, company, content, imageUrl, videoUrl } = body

        if (!name) {
            return NextResponse.json(
                { error: 'Name is required' },
                { status: 400 }
            )
        }

        const testimonial = await prisma.testimonial.create({
            data: {
                name,
                role,
                company,
                content,
                imageUrl,
                videoUrl,
            },
        })

        return NextResponse.json(testimonial, { status: 201 })
    } catch (error) {
        console.error('Error creating testimonial:', error)
        return NextResponse.json(
            { error: 'Failed to create testimonial' },
            { status: 500 }
        )
    }
}
