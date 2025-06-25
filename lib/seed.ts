import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export async function seedDatabase() {
  try {
    // Check if admin user already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: process.env.ADMIN_EMAIL || 'admin@aaaacademy.com' }
    })

    if (existingAdmin) {
      console.log('Admin user already exists')
      return
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD || 'admin123',
      12
    )

    const adminUser = await prisma.user.create({
      data: {
        email: process.env.ADMIN_EMAIL || 'admin@aaaacademy.com',
        name: 'Admin User',
        password: hashedPassword,
        role: 'ADMIN'
      }
    })

    console.log('Admin user created:', adminUser.email)

    // Create some sample events
    const sampleEvents = [
      {
        title: 'Healthcare Accreditation Certification Program',
        description: 'Comprehensive training program for healthcare professionals seeking accreditation expertise.',
        category: 'CERTIFICATION',
        duration: '5 Days',
        price: 1299,
        date: new Date('2024-03-15T09:00:00Z'),
        location: 'New York, NY',
        maxParticipants: 25,
        isVirtual: false,
        createdBy: adminUser.id
      },
      {
        title: 'Quality Management Systems Workshop',
        description: 'Master the fundamentals of ISO 9001 and quality management implementation.',
        category: 'WORKSHOP',
        duration: '2 Days',
        price: 599,
        date: new Date('2024-03-22T09:00:00Z'),
        location: 'Virtual Event',
        maxParticipants: 50,
        isVirtual: true,
        createdBy: adminUser.id
      },
      {
        title: 'Advanced Auditing Techniques Seminar',
        description: 'Learn cutting-edge auditing methodologies and best practices from industry experts.',
        category: 'SEMINAR',
        duration: '1 Day',
        price: 399,
        date: new Date('2024-04-05T09:00:00Z'),
        location: 'Chicago, IL',
        maxParticipants: 40,
        isVirtual: false,
        createdBy: adminUser.id
      },
      {
        title: 'Global Accreditation Trends Webinar',
        description: 'Explore emerging trends and future directions in international accreditation.',
        category: 'WEBINAR',
        duration: '2 Hours',
        price: 0,
        date: new Date('2024-04-12T14:00:00Z'),
        location: 'Online Event',
        isVirtual: true,
        createdBy: adminUser.id
      }
    ]

    for (const eventData of sampleEvents) {
      await prisma.event.create({ data: eventData })
    }

    console.log('Sample events created')
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  }
} 