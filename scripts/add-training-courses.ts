import { prisma } from '../lib/prisma'
import { EventCategory } from '@prisma/client'

async function addTrainingCourses() {
    try {
        // Get admin user ID
        const adminUser = await prisma.user.findFirst({
            where: { role: 'ADMIN' }
        })

        if (!adminUser) {
            console.error('No admin user found. Please run the seed script first.')
            process.exit(1)
        }

        console.log('Adding new training courses...')

        const trainingCourses = [
            {
                title: 'Approved Consultants for Healthcare Accreditation',
                description: 'This comprehensive course is designed for healthcare professionals who want to become approved consultants for healthcare accreditation. The program covers all aspects of healthcare accreditation consulting, including assessment techniques, documentation requirements, and quality improvement strategies.',
                category: EventCategory.COURSE,
                duration: '2 Days',
                price: 999,
                date: new Date('2026-01-23T09:00:00Z'),
                location: 'Online',
                language: 'English',
                maxParticipants: 30,
                isVirtual: true,
                imageUrl: null,
                galleryImages: [],
                keyLearningOutcomes: [
                    'Understand healthcare accreditation consulting principles',
                    'Master assessment and gap analysis techniques',
                    'Learn documentation and evidence collection methods',
                    'Develop quality improvement strategies',
                    'Gain expertise in accreditation preparation guidance'
                ],
                speakers: [
                    {
                        name: 'Ruhina',
                        title: 'Healthcare Accreditation Consultant',
                        description: 'Expert in healthcare accreditation with extensive experience in guiding organizations through the accreditation process.',
                        imageUrl: null
                    }
                ],
                courseHighlights: [
                    'Interactive workshops with real-world case studies',
                    'Hands-on training with industry-standard tools',
                    'Networking opportunities with healthcare professionals',
                    'Access to exclusive accreditation resources',
                    'Certification from internationally recognized body'
                ],
                prerequisites: [
                    'Healthcare background or related experience',
                    'Interest in healthcare quality and accreditation',
                    'Basic understanding of quality management principles'
                ],
                whyChoose: [
                    'Learn from industry experts',
                    'Gain internationally recognized certification',
                    'Access to exclusive AAA resources and network',
                    'Practical, hands-on learning approach'
                ],
                certificateDescription: 'Upon successful completion, participants will receive an AAA Approved Healthcare Accreditation Consultant certificate.',
                certificateImageUrl: '',
                certificateUrl: '',
                calendlyUrl: 'https://campaign.aaa-accreditation.org/approved-healthcare-accreditation-consultants',
                slug: 'approved-consultants-healthcare-accreditation-2026',
                createdBy: adminUser.id
            },
            {
                title: 'Become an Approved Inspection Assessor – ISO/IEC 17020',
                description: 'Learn to become an approved inspection assessor according to ISO/IEC 17020 standards. This course covers the requirements for the competence of inspection bodies and the key principles of inspection body assessment.',
                category: EventCategory.COURSE,
                duration: '2 Days',
                price: 999,
                date: new Date('2026-03-20T09:00:00Z'),
                location: 'Online',
                language: 'English',
                maxParticipants: 30,
                isVirtual: true,
                imageUrl: null,
                galleryImages: [],
                keyLearningOutcomes: [
                    'Understand ISO/IEC 17020 requirements',
                    'Master inspection body assessment techniques',
                    'Learn documentation and evidence evaluation',
                    'Develop competence assessment skills',
                    'Gain expertise in inspection accreditation'
                ],
                speakers: [
                    {
                        name: 'Ahmed Tawwab',
                        title: 'ISO 17020 Expert',
                        description: 'Expert in ISO/IEC 17020 with extensive experience in inspection body accreditation and assessment.',
                        imageUrl: null
                    }
                ],
                courseHighlights: [
                    'ISO/IEC 17020 standard deep dive',
                    'Practical assessment exercises',
                    'Real-world case studies',
                    'Interactive workshops'
                ],
                prerequisites: [
                    'Understanding of quality management systems',
                    'Interest in inspection body accreditation',
                    'Basic knowledge of ISO standards'
                ],
                whyChoose: [
                    'Expert instruction from certified professionals',
                    'Internationally recognized certification',
                    'Practical, hands-on approach',
                    'Career advancement opportunities'
                ],
                certificateDescription: 'Upon successful completion, participants will receive an AAA Approved Inspection Assessor certificate.',
                certificateImageUrl: '',
                certificateUrl: '',
                calendlyUrl: 'https://campaign.aaa-accreditation.org/assessors-for-inspection-bodies-accreditation-iso-iec-17020',
                slug: 'approved-inspection-assessor-iso-17020',
                createdBy: adminUser.id
            },
            {
                title: 'How to Estimate Measurement Uncertainty in Your Laboratory',
                description: 'Master the principles and practical techniques for estimating measurement uncertainty in laboratory testing. This course covers statistical methods, uncertainty sources, and documentation requirements for laboratory accreditation.',
                category: EventCategory.COURSE,
                duration: '2 Days',
                price: 999,
                date: new Date('2026-05-22T09:00:00Z'),
                location: 'Online',
                language: 'English',
                maxParticipants: 30,
                isVirtual: true,
                imageUrl: null,
                galleryImages: [],
                keyLearningOutcomes: [
                    'Understand measurement uncertainty concepts',
                    'Learn statistical methods for uncertainty estimation',
                    'Identify and quantify uncertainty sources',
                    'Master GUM methodology',
                    'Develop uncertainty budgets and documentation'
                ],
                speakers: [
                    {
                        name: 'Khaled Sadeq',
                        title: 'Laboratory Quality Expert',
                        description: 'Expert in laboratory quality and measurement uncertainty with extensive experience in laboratory accreditation.',
                        imageUrl: null
                    }
                ],
                courseHighlights: [
                    'Hands-on uncertainty calculations',
                    'Practical laboratory examples',
                    'GUM methodology application',
                    'Documentation templates'
                ],
                prerequisites: [
                    'Laboratory experience',
                    'Basic statistical knowledge',
                    'Understanding of laboratory operations'
                ],
                whyChoose: [
                    'Practical, calculation-focused training',
                    'Expert instruction',
                    'Ready-to-use templates and tools',
                    'Laboratory accreditation preparation'
                ],
                certificateDescription: 'Upon successful completion, participants will receive an AAA Measurement Uncertainty Certificate.',
                certificateImageUrl: '',
                certificateUrl: '',
                calendlyUrl: 'https://campaign.aaa-accreditation.org/measurement-uncertainty',
                slug: 'measurement-uncertainty-laboratory',
                createdBy: adminUser.id
            },
            {
                title: 'Become an Approved Laboratory Assessor – ISO/IEC 17025',
                description: 'Become an approved laboratory assessor according to ISO/IEC 17025 standards. This comprehensive course covers laboratory accreditation requirements, assessment techniques, and competence evaluation for testing and calibration laboratories.',
                category: EventCategory.COURSE,
                duration: '2 Days',
                price: 999,
                date: new Date('2026-07-18T09:00:00Z'),
                location: 'Online',
                language: 'English',
                maxParticipants: 30,
                isVirtual: true,
                imageUrl: null,
                galleryImages: [],
                keyLearningOutcomes: [
                    'Understand ISO/IEC 17025 requirements',
                    'Master laboratory assessment techniques',
                    'Learn technical evaluation methods',
                    'Develop competence assessment skills',
                    'Gain expertise in laboratory accreditation'
                ],
                speakers: [],
                courseHighlights: [
                    'ISO/IEC 17025 standard deep dive',
                    'Practical assessment exercises',
                    'Technical evaluation techniques',
                    'Interactive case studies'
                ],
                prerequisites: [
                    'Laboratory experience',
                    'Understanding of quality management',
                    'Basic knowledge of ISO standards'
                ],
                whyChoose: [
                    'Internationally recognized certification',
                    'Practical assessment training',
                    'Career advancement opportunities',
                    'Expert instruction'
                ],
                certificateDescription: 'Upon successful completion, participants will receive an AAA Approved Laboratory Assessor certificate.',
                certificateImageUrl: '',
                certificateUrl: '',
                calendlyUrl: 'https://campaign.aaa-accreditation.org/iso-17025',
                slug: 'approved-laboratory-assessor-iso-17025',
                createdBy: adminUser.id
            },
            {
                title: 'Accredited Surveyor Development Program',
                description: 'Comprehensive development program for healthcare surveyors. This program covers all aspects of healthcare accreditation surveying, including assessment techniques, standards interpretation, and survey conduct.',
                category: EventCategory.COURSE,
                duration: '2 Days',
                price: 999,
                date: new Date('2026-09-25T09:00:00Z'),
                location: 'Online',
                language: 'English',
                maxParticipants: 30,
                isVirtual: true,
                imageUrl: null,
                galleryImages: [],
                keyLearningOutcomes: [
                    'Master healthcare surveyor competencies',
                    'Learn survey planning and conduct',
                    'Develop assessment and interview skills',
                    'Understand standards interpretation',
                    'Create effective survey reports'
                ],
                speakers: [],
                courseHighlights: [
                    'Comprehensive surveyor training',
                    'Practical survey exercises',
                    'Role-play and simulations',
                    'Report writing techniques'
                ],
                prerequisites: [
                    'Healthcare background',
                    'Quality management experience',
                    'Interest in healthcare surveying'
                ],
                whyChoose: [
                    'Become an approved AAA surveyor',
                    'Comprehensive training program',
                    'Career advancement in healthcare',
                    'Expert instruction'
                ],
                certificateDescription: 'Upon successful completion, participants will receive an AAA Accredited Surveyor certificate.',
                certificateImageUrl: '',
                certificateUrl: '',
                calendlyUrl: 'https://campaign.aaa-accreditation.org/healthcare-surveyors',
                slug: 'accredited-surveyor-development-program',
                createdBy: adminUser.id
            },
            {
                title: 'Certified Telehealth Accreditation Professional',
                description: 'Become a certified professional in telehealth accreditation. This course covers telehealth standards, quality requirements, and accreditation processes for telehealth services and providers.',
                category: EventCategory.COURSE,
                duration: '2 Days',
                price: 999,
                date: new Date('2026-11-28T09:00:00Z'),
                location: 'Online',
                language: 'English',
                maxParticipants: 30,
                isVirtual: true,
                imageUrl: null,
                galleryImages: [],
                keyLearningOutcomes: [
                    'Understand telehealth accreditation standards',
                    'Learn telehealth quality requirements',
                    'Master telehealth assessment techniques',
                    'Develop telehealth compliance strategies',
                    'Gain expertise in digital health accreditation'
                ],
                speakers: [],
                courseHighlights: [
                    'Telehealth standards overview',
                    'Digital health quality assessment',
                    'Practical accreditation exercises',
                    'Emerging trends in telehealth'
                ],
                prerequisites: [
                    'Healthcare experience',
                    'Interest in telehealth',
                    'Understanding of quality principles'
                ],
                whyChoose: [
                    'Emerging field certification',
                    'Future-focused training',
                    'Expert instruction',
                    'Career opportunities in digital health'
                ],
                certificateDescription: 'Upon successful completion, participants will receive a Certified Telehealth Accreditation Professional certificate.',
                certificateImageUrl: '',
                certificateUrl: '',
                calendlyUrl: '',
                slug: 'certified-telehealth-accreditation-professional',
                createdBy: adminUser.id
            },
            {
                title: 'Become an Approved Medical Laboratory Assessor – ISO 15189',
                description: 'Become an approved medical laboratory assessor according to ISO 15189 standards. This course covers medical laboratory accreditation requirements, quality management, and assessment techniques specific to medical laboratories.',
                category: EventCategory.COURSE,
                duration: '2 Days',
                price: 999,
                date: new Date('2027-01-15T09:00:00Z'),
                location: 'Online',
                language: 'English',
                maxParticipants: 30,
                isVirtual: true,
                imageUrl: null,
                galleryImages: [],
                keyLearningOutcomes: [
                    'Understand ISO 15189 requirements',
                    'Master medical laboratory assessment',
                    'Learn pre-analytical, analytical, and post-analytical evaluation',
                    'Develop clinical laboratory competence assessment skills',
                    'Gain expertise in medical laboratory accreditation'
                ],
                speakers: [],
                courseHighlights: [
                    'ISO 15189 standard deep dive',
                    'Medical laboratory specific requirements',
                    'Clinical assessment techniques',
                    'Practical exercises'
                ],
                prerequisites: [
                    'Medical laboratory experience',
                    'Understanding of quality management',
                    'Basic knowledge of ISO standards'
                ],
                whyChoose: [
                    'Medical laboratory focused training',
                    'Internationally recognized certification',
                    'Expert instruction',
                    'Career advancement opportunities'
                ],
                certificateDescription: 'Upon successful completion, participants will receive an AAA Approved Medical Laboratory Assessor certificate.',
                certificateImageUrl: '',
                certificateUrl: '',
                calendlyUrl: 'https://campaign.aaa-accreditation.org/iso-15189',
                slug: 'approved-medical-laboratory-assessor-iso-15189',
                createdBy: adminUser.id
            },
            {
                title: 'Become an Approved Accreditation Consultant',
                description: 'Comprehensive training to become an approved accreditation consultant. This course covers all aspects of accreditation consulting, including gap analysis, documentation, implementation guidance, and audit preparation.',
                category: EventCategory.COURSE,
                duration: '2 Days',
                price: 999,
                date: new Date('2027-01-20T09:00:00Z'),
                location: 'Online',
                language: 'English',
                maxParticipants: 30,
                isVirtual: true,
                imageUrl: null,
                galleryImages: [],
                keyLearningOutcomes: [
                    'Master accreditation consulting principles',
                    'Learn gap analysis and assessment techniques',
                    'Develop implementation guidance skills',
                    'Understand documentation requirements',
                    'Gain expertise in audit preparation'
                ],
                speakers: [],
                courseHighlights: [
                    'Comprehensive consulting training',
                    'Practical consulting exercises',
                    'Client management techniques',
                    'Business development guidance'
                ],
                prerequisites: [
                    'Quality management experience',
                    'Understanding of accreditation standards',
                    'Interest in consulting career'
                ],
                whyChoose: [
                    'Become an approved AAA consultant',
                    'Comprehensive training program',
                    'Career opportunities in consulting',
                    'Expert instruction'
                ],
                certificateDescription: 'Upon successful completion, participants will receive an AAA Approved Accreditation Consultant certificate.',
                certificateImageUrl: '',
                certificateUrl: '',
                calendlyUrl: 'https://campaign.aaa-accreditation.org/approved-healthcare-accreditation-consultants',
                slug: 'approved-accreditation-consultant-2027',
                createdBy: adminUser.id
            }
        ]

        for (const course of trainingCourses) {
            // Check if course with same slug already exists
            const existing = await prisma.event.findUnique({
                where: { slug: course.slug }
            })

            if (existing) {
                console.log(`Course already exists: ${course.title}`)
                continue
            }

            await prisma.event.create({ data: course })
            console.log(`Created course: ${course.title}`)
        }

        console.log('All training courses added successfully!')
        process.exit(0)
    } catch (error) {
        console.error('Error adding training courses:', error)
        process.exit(1)
    }
}

addTrainingCourses()
