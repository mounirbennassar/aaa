import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// DELETE - delete a speaker
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        await prisma.speaker.delete({
            where: { id }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting speaker:', error)
        return NextResponse.json({ error: 'Failed to delete speaker' }, { status: 500 })
    }
}

// PUT - update a speaker
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()
        const { name, title, description, imageUrl, isActive, order } = body

        const speaker = await prisma.speaker.update({
            where: { id },
            data: {
                name,
                title,
                description,
                imageUrl,
                isActive,
                order
            }
        })

        return NextResponse.json({ speaker })
    } catch (error) {
        console.error('Error updating speaker:', error)
        return NextResponse.json({ error: 'Failed to update speaker' }, { status: 500 })
    }
}
