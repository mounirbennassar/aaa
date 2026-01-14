import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const order = searchParams.get('order') || 'desc'
    const upcoming = searchParams.get('upcoming') === 'true'

    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {}

    if (category && category !== 'all') {
      where.category = category.toUpperCase()
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Filter for upcoming events only (date >= today)
    if (upcoming) {
      where.date = { gte: new Date() }
    }

    // Determine sort field and order
    const validSortFields = ['date', 'createdAt', 'title', 'price']
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt'
    const sortOrder = order === 'asc' ? 'asc' : 'desc'

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortField]: sortOrder },
        include: {
          creator: {
            select: {
              name: true,
              email: true
            }
          }
        }
      }),
      prisma.event.count({ where })
    ])

    return NextResponse.json({
      events,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
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
    const {
      title,
      description,
      category,
      duration,
      price,
      currency = 'USD',
      date,
      location,
      language = 'English',
      maxParticipants,
      imageUrl,
      galleryImages,
      keyLearningOutcomes,
      speakers,
      courseHighlights,
      prerequisites,
      whyChoose,
      certificateDescription,
      certificateImageUrl,
      certificateUrl,
      calendlyUrl,
      isVirtual = false,
      isActive = true,
      slug
    } = body

    // Validate required fields
    if (!title || !description || !category || !duration || !date || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate slug from title if not provided
    const generatedSlug = slug || title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const event = await prisma.event.create({
      data: {
        title,
        description,
        category: category.toUpperCase(),
        duration,
        price: parseFloat(price),
        currency,
        date: new Date(date),
        location,
        language,
        maxParticipants: maxParticipants ? parseInt(maxParticipants) : null,
        imageUrl,
        galleryImages: galleryImages || [],
        keyLearningOutcomes: keyLearningOutcomes || [],
        speakers: speakers || [],
        courseHighlights: courseHighlights || [],
        prerequisites: prerequisites || [],
        whyChoose: whyChoose || [],
        certificateDescription,
        certificateImageUrl,
        certificateUrl,
        calendlyUrl,
        isVirtual,
        isActive,
        createdBy: session.user.id
      },
      include: {
        creator: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    )
  }
} 