import { prisma } from '../lib/prisma'
import { EventCategory } from '@prisma/client'

async function addWebinars() {
    try {
        // Get admin user ID
        const adminUser = await prisma.user.findFirst({
            where: { role: 'ADMIN' }
        })

        if (!adminUser) {
            console.error('No admin user found. Please run the seed script first.')
            process.exit(1)
        }

        console.log('Adding new webinars...')

        const webinars = [
            {
                title: 'Customer Service Behaviors That Support Accreditation',
                description: 'Join Naushin in this webinar to learn about customer service behaviors that support accreditation. Discover how excellent customer service practices align with and enhance accreditation standards and outcomes.',
                category: EventCategory.WEBINAR,
                duration: '1 Hour',
                price: 0,
                date: new Date('2026-01-09T14:00:00Z'),
                location: 'Online',
                language: 'English',
                maxParticipants: 100,
                isVirtual: true,
                imageUrl: null,
                galleryImages: [],
                keyLearningOutcomes: [
                    'Understand the connection between customer service and accreditation',
                    'Learn key behaviors that support accreditation success',
                    'Develop strategies for improving customer service in accredited organizations',
                    'Discover best practices for customer-focused accreditation preparation'
                ],
                speakers: [],
                courseHighlights: [
                    'Interactive Q&A session',
                    'Real-world examples and case studies',
                    'Practical tips for immediate implementation'
                ],
                prerequisites: [],
                whyChoose: [],
                certificateDescription: 'Participants will receive a Certificate of Attendance for this webinar.',
                certificateImageUrl: '',
                certificateUrl: '',
                calendlyUrl: 'https://zoom.us/webinar/register/WN_EOpZZIIFTVCmSBYlcRpTEA',
                slug: 'customer-service-behaviors-accreditation',
                createdBy: adminUser.id
            },
            {
                title: 'The Road to ISO 17020 Inspection Accreditation - Part 2',
                description: 'Join Ahmed Tawwab for the second part of this comprehensive series on ISO 17020 inspection accreditation. Learn advanced concepts and practical implementation strategies for achieving and maintaining inspection body accreditation.',
                category: EventCategory.WEBINAR,
                duration: '1 Hour',
                price: 0,
                date: new Date('2026-01-15T14:00:00Z'),
                location: 'Online',
                language: 'English',
                maxParticipants: 100,
                isVirtual: true,
                imageUrl: null,
                galleryImages: [],
                keyLearningOutcomes: [
                    'Understand advanced ISO 17020 requirements',
                    'Learn practical implementation strategies',
                    'Master inspection accreditation documentation',
                    'Develop continuous improvement practices'
                ],
                speakers: [],
                courseHighlights: [
                    'Advanced ISO 17020 concepts',
                    'Interactive Q&A session',
                    'Practical implementation guidance'
                ],
                prerequisites: [],
                whyChoose: [],
                certificateDescription: 'Participants will receive a Certificate of Attendance for this webinar.',
                certificateImageUrl: '',
                certificateUrl: '',
                calendlyUrl: 'https://zoom.us/webinar/register/WN_B8-X4ykvQUGBs81LYMioDA',
                slug: 'road-to-iso-17020-inspection-accreditation-part-2',
                createdBy: adminUser.id
            },
            {
                title: 'How to Tell If Your Organization Is Ready for Accreditation',
                description: '¿Está lista su organización para la acreditación? Únase a Orlando en este seminario web en español para aprender a evaluar la preparación de su organización para el proceso de acreditación.',
                category: EventCategory.WEBINAR,
                duration: '1 Hour',
                price: 0,
                date: new Date('2026-01-31T14:00:00Z'),
                location: 'Online',
                language: 'Spanish',
                maxParticipants: 100,
                isVirtual: true,
                imageUrl: null,
                galleryImages: [],
                keyLearningOutcomes: [
                    'Evaluate organizational readiness for accreditation',
                    'Identify key indicators of accreditation preparedness',
                    'Understand the self-assessment process',
                    'Develop improvement action plans'
                ],
                speakers: [],
                courseHighlights: [
                    'Presented in Spanish',
                    'Interactive readiness assessment',
                    'Practical guidance for accreditation preparation'
                ],
                prerequisites: [],
                whyChoose: [],
                certificateDescription: 'Participants will receive a Certificate of Attendance for this webinar.',
                certificateImageUrl: '',
                certificateUrl: '',
                calendlyUrl: 'https://zoom.us/webinar/register/WN_Hy_wrSOcRm6Juv_sGoENQg',
                slug: 'organization-ready-for-accreditation-spanish',
                createdBy: adminUser.id
            },
            {
                title: 'Why and How to Get AAA\'s Membership',
                description: 'Join James to learn about the benefits of AAA membership and how to become a member. Discover the exclusive resources, networking opportunities, and professional development options available to AAA members.',
                category: EventCategory.WEBINAR,
                duration: '1 Hour',
                price: 0,
                date: new Date('2026-02-13T14:00:00Z'),
                location: 'Online',
                language: 'English',
                maxParticipants: 100,
                isVirtual: true,
                imageUrl: null,
                galleryImages: [],
                keyLearningOutcomes: [
                    'Understand the benefits of AAA membership',
                    'Learn about membership tiers and options',
                    'Discover exclusive member resources',
                    'Understand the membership application process'
                ],
                speakers: [],
                courseHighlights: [
                    'Membership benefits overview',
                    'Interactive Q&A session',
                    'Step-by-step membership guidance'
                ],
                prerequisites: [],
                whyChoose: [],
                certificateDescription: 'Participants will receive a Certificate of Attendance for this webinar.',
                certificateImageUrl: '',
                certificateUrl: '',
                calendlyUrl: 'https://zoom.us/webinar/register/WN_XByLUrpeRnubYd-oespgqg',
                slug: 'why-how-get-aaa-membership',
                createdBy: adminUser.id
            },
            {
                title: 'AAA Academy Official Launch Event',
                description: 'You are cordially invited to attend AAA Academy\'s official launch event. Join Dima and Dr. Saad for this special celebration as we unveil our comprehensive professional training and certification programs.',
                category: EventCategory.WEBINAR,
                duration: '1 Hour',
                price: 0,
                date: new Date('2026-02-20T14:00:00Z'),
                location: 'Online',
                language: 'English',
                maxParticipants: 200,
                isVirtual: true,
                imageUrl: null,
                galleryImages: [],
                keyLearningOutcomes: [
                    'Learn about AAA Academy programs and offerings',
                    'Discover training and certification pathways',
                    'Meet the AAA Academy leadership team',
                    'Understand how to get started with AAA Academy'
                ],
                speakers: [],
                courseHighlights: [
                    'Official launch ceremony',
                    'Program announcements',
                    'Exclusive launch offers',
                    'Networking opportunities'
                ],
                prerequisites: [],
                whyChoose: [],
                certificateDescription: 'Participants will receive a Certificate of Attendance for this launch event.',
                certificateImageUrl: '',
                certificateUrl: '',
                calendlyUrl: 'https://zoom.us/webinar/register/WN_vzQz2Q31QhaZpjdUsK_7HQ',
                slug: 'aaa-academy-official-launch',
                createdBy: adminUser.id
            },
            {
                title: 'Are You Ready for Accreditation? Here\'s How to Check',
                description: 'La vostra organizzazione è pronta per l\'accreditamento? Unisciti a Rodolfo in questo webinar in italiano per imparare a valutare la preparazione della tua organizzazione al processo di accreditamento.',
                category: EventCategory.WEBINAR,
                duration: '1 Hour',
                price: 0,
                date: new Date('2026-02-27T14:00:00Z'),
                location: 'Online',
                language: 'Italian',
                maxParticipants: 100,
                isVirtual: true,
                imageUrl: null,
                galleryImages: [],
                keyLearningOutcomes: [
                    'Evaluate organizational readiness for accreditation',
                    'Identify key indicators of accreditation preparedness',
                    'Understand the self-assessment process',
                    'Develop improvement action plans'
                ],
                speakers: [],
                courseHighlights: [
                    'Presented in Italian',
                    'Interactive readiness assessment',
                    'Practical guidance for accreditation preparation'
                ],
                prerequisites: [],
                whyChoose: [],
                certificateDescription: 'Participants will receive a Certificate of Attendance for this webinar.',
                certificateImageUrl: '',
                certificateUrl: '',
                calendlyUrl: 'https://zoom.us/webinar/register/WN_N_2H0ynPTy6vZXMrHFXQLQ',
                slug: 'ready-for-accreditation-italian',
                createdBy: adminUser.id
            },
            {
                title: 'Show Me the Evidence! A Practical Guide to Gap Assessment in Healthcare',
                description: 'Join Ruhina for this practical webinar on gap assessment in healthcare. Learn how to identify gaps between current practices and accreditation requirements, and develop evidence-based improvement strategies.',
                category: EventCategory.WEBINAR,
                duration: '1 Hour',
                price: 0,
                date: new Date('2026-03-12T14:00:00Z'),
                location: 'Online',
                language: 'English',
                maxParticipants: 100,
                isVirtual: true,
                imageUrl: null,
                galleryImages: [],
                keyLearningOutcomes: [
                    'Understand gap assessment methodologies in healthcare',
                    'Learn evidence collection and documentation techniques',
                    'Master gap analysis and prioritization',
                    'Develop evidence-based improvement action plans'
                ],
                speakers: [],
                courseHighlights: [
                    'Practical gap assessment techniques',
                    'Evidence collection best practices',
                    'Interactive case studies',
                    'Actionable improvement strategies'
                ],
                prerequisites: [],
                whyChoose: [],
                certificateDescription: 'Participants will receive a Certificate of Attendance for this webinar.',
                certificateImageUrl: '',
                certificateUrl: '',
                calendlyUrl: 'https://zoom.us/webinar/register/WN_tpSEM7S0Tcm1dbDmggTunA',
                slug: 'gap-assessment-healthcare-guide',
                createdBy: adminUser.id
            }
        ]

        for (const webinar of webinars) {
            // Check if webinar with same slug already exists
            const existing = await prisma.event.findUnique({
                where: { slug: webinar.slug }
            })

            if (existing) {
                console.log(`Webinar already exists: ${webinar.title}`)
                continue
            }

            await prisma.event.create({ data: webinar })
            console.log(`Created webinar: ${webinar.title}`)
        }

        console.log('All webinars added successfully!')
        process.exit(0)
    } catch (error) {
        console.error('Error adding webinars:', error)
        process.exit(1)
    }
}

addWebinars()
