import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getStaffSession } from '@/lib/auth-helpers'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    // Try to find by slug first
    let event = await prisma.event.findUnique({
      where: { slug },
      include: {
        creator: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    // If not found by slug, try to find by id (for backward compatibility)
    if (!event) {
      event = await prisma.event.findUnique({
        where: { id: slug },
        include: {
          creator: {
            select: {
              name: true,
              email: true
            }
          }
        }
      })
    }

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(event)
  } catch (error) {
    console.error('Error fetching event:', error)
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getStaffSession()

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { slug } = await params
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
      order
    } = body

    // Validate required fields
    if (!title || !description || !category || !duration || !date || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Find the event by id
    const existingEvent = await prisma.event.findUnique({
      where: { id: slug }
    })

    if (!existingEvent) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    const updatedEvent = await prisma.event.update({
      where: { id: existingEvent.id },
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
        ...(order !== undefined && { order: parseInt(order) || 0 })
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

    return NextResponse.json(updatedEvent)
  } catch (error) {
    console.error('Error updating event:', error)
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getStaffSession()

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { slug } = await params

    // Find the event by id
    const existingEvent = await prisma.event.findUnique({
      where: { id: slug }
    })

    if (!existingEvent) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    await prisma.event.delete({
      where: { id: existingEvent.id }
    })

    return NextResponse.json({ message: 'Event deleted successfully' })
  } catch (error) {
    console.error('Error deleting event:', error)
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    )
  }
}

// PATCH - toggle a single field (currently just isActive). Staff only.
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getStaffSession()

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { slug } = await params
    const body = await request.json()

    if (typeof body.isActive !== 'boolean') {
      return NextResponse.json(
        { error: 'isActive (boolean) is required' },
        { status: 400 }
      )
    }

    const existingEvent = await prisma.event.findUnique({
      where: { id: slug }
    })

    if (!existingEvent) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    const updatedEvent = await prisma.event.update({
      where: { id: existingEvent.id },
      data: { isActive: body.isActive }
    })

    return NextResponse.json(updatedEvent)
  } catch (error) {
    console.error('Error updating event status:', error)
    return NextResponse.json(
      { error: 'Failed to update status' },
      { status: 500 }
    )
  }
} 