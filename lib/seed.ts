import bcrypt from 'bcryptjs'
import { prisma } from './prisma'
import { EventCategory } from '@prisma/client'

export async function seedDatabase() {
  try {
    // Check if admin user already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: process.env.ADMIN_EMAIL || 'admin@aaaacademy.com' }
    })

    let adminUser = existingAdmin;

    if (!existingAdmin) {
    // Create admin user
    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD || 'admin123',
      12
    )

      adminUser = await prisma.user.create({
      data: {
        email: process.env.ADMIN_EMAIL || 'admin@aaaacademy.com',
        name: 'Admin User',
        password: hashedPassword,
        role: 'ADMIN'
      }
    })

    console.log('Admin user created:', adminUser.email)
    } else {
      console.log('Admin user already exists')
    }

    // Clear existing events
    await prisma.event.deleteMany({})
    console.log('Existing events cleared')

    // Create comprehensive sample events with all fields
    const sampleEvents = [
      // COURSES
      {
        title: 'Approved Surveyors for Healthcare Accreditation',
        description: 'This comprehensive course is designed for healthcare professionals who want to become approved surveyors for healthcare accreditation. The program covers all aspects of healthcare accreditation processes, survey methodologies, and quality assessment techniques.',
        category: EventCategory.COURSE,
        duration: '3 Days',
        price: 1299,
        date: new Date('2025-03-15T09:00:00Z'),
        location: 'Dubai, UAE',
        language: 'English',
        maxParticipants: 25,
        isVirtual: false,
        imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
        galleryImages: [],
        // galleryImages: [],
        keyLearningOutcomes: [
          'Understand the healthcare accreditation process and standards',
          'Master survey techniques and assessment methodologies',
          'Develop skills in quality evaluation and reporting',
          'Learn regulatory compliance requirements',
          'Gain expertise in healthcare quality management systems'
        ],
        speakers: [
          {
            name: 'Wendy Danicourt',
            title: 'Manager, Healthcare Accreditation Department',
            description: 'With over 30 years of experience in Healthcare Accreditation, Wendy has been instrumental in developing accreditation standards and training programs for healthcare facilities across the globe.',
            imageUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200'
          },
          {
            name: 'Shakti Derbar',
            title: 'Member, Accreditation Committee',
            description: 'Shakti is a member of AAA Accreditation committee and has extensive experience in healthcare quality assurance and accreditation processes.',
            imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'
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
          'Bachelor\'s degree in healthcare or related field',
          'Minimum 2 years of healthcare experience',
          'Basic understanding of quality management principles',
          'Professional certification in healthcare (preferred)'
        ],
        whyChoose: [
          'Learn from industry experts with decades of experience',
          'Gain internationally recognized certification',
          'Access to exclusive AAA resources and network',
          'Practical, hands-on learning approach',
          'Career advancement opportunities in healthcare accreditation'
        ],
        certificateDescription: 'Upon successful completion, participants will receive an AAA Certified Healthcare Surveyor certificate, internationally recognized and valid for 3 years. This certificate demonstrates your expertise in healthcare accreditation and survey processes.',
        certificateImageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
        certificateUrl: 'https://www.aaa.org/certificates/healthcare-surveyor',
        slug: 'approved-surveyors-healthcare-accreditation',
        createdBy: adminUser!.id
      },
      {
        title: 'Quality Management Systems ISO 9001:2015',
        description: 'Master the fundamentals of ISO 9001:2015 Quality Management Systems. This comprehensive course covers implementation, documentation, and continuous improvement strategies for organizations seeking ISO certification.',
        category: EventCategory.COURSE,
        duration: '4 Days',
        price: 999,
        date: new Date('2025-04-20T09:00:00Z'),
        location: 'Online',
        language: 'English',
        maxParticipants: 40,
        isVirtual: true,
        imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400',
        galleryImages: [],
        // galleryImages: [],
        keyLearningOutcomes: [
          'Understand ISO 9001:2015 standard requirements',
          'Learn QMS implementation strategies',
          'Master documentation and record keeping',
          'Develop internal audit capabilities',
          'Implement continuous improvement processes'
        ],
        speakers: [
          {
            name: 'Dr. Sarah Johnson',
            title: 'ISO 9001 Lead Auditor',
            description: 'Dr. Johnson is a certified ISO 9001 Lead Auditor with 15 years of experience in quality management systems across various industries.',
            imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400'
          }
        ],
        courseHighlights: [
          'Live virtual sessions with Q&A',
          'Downloadable templates and checklists',
          'Interactive case studies and exercises',
          'Access to ISO 9001 implementation toolkit',
          'Post-course support and consultation'
        ],
        prerequisites: [
          'Basic knowledge of quality management concepts',
          'Professional experience in quality or operations',
          'Access to reliable internet connection',
          'Willingness to participate in interactive sessions'
        ],
        whyChoose: [
          'Flexible online learning format',
          'Expert instruction from certified professionals',
          'Practical tools and templates included',
          'Networking with quality professionals globally',
          'Immediate application to your organization'
        ],
        certificateDescription: 'Participants will receive an ISO 9001:2015 Foundation Certificate, demonstrating competency in quality management systems principles and implementation.',
        certificateImageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400',
        certificateUrl: 'https://www.aaa.org/certificates/iso-9001',
        slug: 'quality-management-systems-iso-9001-2015',
        createdBy: adminUser!.id
      },
      {
        title: 'Advanced Food Safety Management HACCP',
        description: 'Comprehensive training in Hazard Analysis and Critical Control Points (HACCP) system for food safety professionals. Learn to identify, evaluate, and control food safety hazards in your organization.',
        category: EventCategory.COURSE,
        duration: '2 Days',
        price: 799,
        date: new Date('2025-05-15T09:00:00Z'),
        location: 'Abu Dhabi, UAE',
        language: 'English',
        maxParticipants: 30,
        isVirtual: false,
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
        galleryImages: [],
        // galleryImages: ['https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400'],
        keyLearningOutcomes: [
          'Understand HACCP principles and implementation',
          'Conduct hazard analysis and risk assessment',
          'Establish critical control points and monitoring procedures',
          'Develop corrective actions and verification systems',
          'Implement documentation and record-keeping systems'
        ],
        speakers: [
          {
            name: 'Ahmed Al-Rashid',
            title: 'Food Safety Consultant',
            description: 'Ahmed is a certified food safety professional with expertise in HACCP implementation across the Middle East region.',
            imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400'
          }
        ],
        courseHighlights: [
          'Hands-on HACCP plan development',
          'Real-world case studies from food industry',
          'Interactive group exercises',
          'HACCP implementation templates',
          'Regulatory compliance guidance'
        ],
        prerequisites: [
          'Basic knowledge of food safety principles',
          'Experience in food industry or related field',
          'Understanding of microbiological hazards',
          'Familiarity with food regulations'
        ],
        whyChoose: [
          'Expert instruction from certified professionals',
          'Practical, industry-relevant training',
          'Comprehensive HACCP toolkit included',
          'Networking with food safety professionals',
          'Immediate application to your workplace'
        ],
        certificateDescription: 'Graduates receive a HACCP Implementation Certificate, recognized by food safety authorities and demonstrating competency in food safety management systems.',
        certificateImageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
        certificateUrl: 'https://www.aaa.org/certificates/haccp',
        slug: 'advanced-food-safety-management-haccp',
        createdBy: adminUser!.id
      },

      // WEBINARS
      {
        title: 'Digital Transformation in Healthcare Accreditation',
        description: 'Explore how digital technologies are revolutionizing healthcare accreditation processes. Learn about emerging trends, challenges, and opportunities in the digital age of healthcare quality assurance.',
        category: EventCategory.WEBINAR,
        duration: '1.5 Hours',
        price: 0,
        date: new Date('2025-02-25T14:00:00Z'),
        location: 'Online',
        language: 'English',
        maxParticipants: 100,
        isVirtual: true,
        imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
        galleryImages: [],
        // galleryImages: ['https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400'],
        keyLearningOutcomes: [
          'Understand digital transformation trends in healthcare',
          'Learn about electronic health records and accreditation',
          'Explore AI and automation in quality assessment',
          'Discover best practices for digital compliance',
          'Understand future directions in healthcare accreditation'
        ],
        speakers: [
          {
            name: 'Dr. Maria Rodriguez',
            title: 'Digital Health Innovation Director',
            description: 'Dr. Rodriguez leads digital transformation initiatives in healthcare accreditation with focus on emerging technologies and innovation.',
            imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400'
          }
        ],
        courseHighlights: [
          'Interactive Q&A session with expert',
          'Real-world case studies and examples',
          'Downloadable resources and templates',
          'Access to exclusive digital tools',
          'Networking with healthcare professionals'
        ],
        prerequisites: [
          'Basic understanding of healthcare systems',
          'Interest in digital transformation',
          'Access to reliable internet connection',
          'No prior technical experience required'
        ],
        whyChoose: [
          'Free access to expert knowledge',
          'Convenient online format',
          'Interactive learning experience',
          'Practical insights and takeaways',
          'Connect with industry leaders'
        ],
        certificateDescription: 'Participants will receive a Certificate of Attendance for this webinar, demonstrating engagement with current trends in healthcare digital transformation.',
        certificateImageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400',
        certificateUrl: 'https://www.aaa.org/certificates/digital-healthcare',
        slug: 'digital-transformation-healthcare-accreditation',
        createdBy: adminUser!.id
      },
      {
        title: 'Risk Management in Quality Systems',
        description: 'Join this interactive webinar to learn about effective risk management strategies in quality management systems. Discover how to identify, assess, and mitigate risks in your organization.',
        category: EventCategory.WEBINAR,
        duration: '1 Hour',
        price: 49,
        date: new Date('2025-03-05T15:00:00Z'),
        location: 'Online',
        language: 'English',
        maxParticipants: 75,
        isVirtual: true,
        imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
        galleryImages: [],
        // galleryImages: ['https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400', 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400'],
        keyLearningOutcomes: [
          'Understand risk management principles',
          'Learn risk identification techniques',
          'Master risk assessment methodologies',
          'Develop risk mitigation strategies',
          'Implement risk monitoring systems'
        ],
        speakers: [
          {
            name: 'John Smith',
            title: 'Risk Management Consultant',
            description: 'John has 20 years of experience in risk management and quality systems across multiple industries.',
            imageUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200'
          }
        ],
        courseHighlights: [
          'Interactive risk assessment tools',
          'Real-world case studies',
          'Downloadable risk register templates',
          'Live Q&A with expert',
          'Access to risk management resources'
        ],
        prerequisites: [
          'Basic knowledge of quality management',
          'Understanding of business processes',
          'Access to reliable internet connection',
          'Willingness to participate in interactive sessions'
        ],
        whyChoose: [
          'Expert guidance from seasoned professional',
          'Practical tools and templates',
          'Interactive learning format',
          'Affordable professional development',
          'Immediate application to your work'
        ],
        certificateDescription: 'Attendees will receive a Risk Management Webinar Certificate, demonstrating knowledge of risk management principles in quality systems.',
        certificateImageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
        certificateUrl: 'https://www.aaa.org/certificates/risk-management',
        slug: 'risk-management-quality-systems',
        createdBy: adminUser!.id
      },
      {
        title: 'Sustainability in Business Excellence',
        description: 'Discover how sustainability practices integrate with business excellence models. Learn about environmental management, social responsibility, and sustainable development in organizational excellence.',
        category: EventCategory.WEBINAR,
        duration: '2 Hours',
        price: 99,
        date: new Date('2025-04-20T13:00:00Z'),
        location: 'Online',
        language: 'English',
        maxParticipants: 60,
        isVirtual: true,
        imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400',
        galleryImages: [],
        // galleryImages: ['https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400'],
        keyLearningOutcomes: [
          'Understand sustainability frameworks',
          'Learn environmental management principles',
          'Explore social responsibility practices',
          'Discover sustainable business models',
          'Implement sustainability metrics and reporting'
        ],
        speakers: [
          {
            name: 'Dr. Emma Green',
            title: 'Sustainability Excellence Expert',
            description: 'Dr. Green specializes in sustainable business practices and has helped numerous organizations integrate sustainability into their excellence frameworks.',
            imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400'
          }
        ],
        courseHighlights: [
          'Comprehensive sustainability assessment tools',
          'Best practice case studies',
          'Interactive sustainability planning session',
          'Access to sustainability resources library',
          'Networking with sustainability professionals'
        ],
        prerequisites: [
          'Basic understanding of business excellence',
          'Interest in sustainability practices',
          'Access to reliable internet connection',
          'No prior sustainability experience required'
        ],
        whyChoose: [
          'Expert instruction from sustainability leader',
          'Practical tools for immediate implementation',
          'Interactive and engaging format',
          'Comprehensive resource library access',
          'Connect with like-minded professionals'
        ],
        certificateDescription: 'Participants will receive a Sustainability in Business Excellence Certificate, demonstrating understanding of sustainable business practices and their integration with excellence models.',
        certificateImageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400',
        certificateUrl: 'https://www.aaa.org/certificates/sustainability-excellence',
        slug: 'sustainability-business-excellence',
        createdBy: adminUser!.id
      },
      // NEW EVENTS WITH 10/12/2025 DATE
      {
        title: 'Business Excellence Model Implementation',
        description: 'Master the principles of business excellence and learn how to implement world-class business excellence models in your organization. This course covers frameworks like EFQM, Baldrige, and other recognized excellence models.',
        category: EventCategory.COURSE,
        duration: '5 Days',
        price: 1499,
        date: new Date('2025-12-10T09:00:00Z'),
        location: 'Riyadh, Saudi Arabia',
        language: 'English',
        maxParticipants: 20,
        isVirtual: false,
        imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
        galleryImages: [],
        // galleryImages: ['https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400', 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400'],
        keyLearningOutcomes: [
          'Understand business excellence frameworks and models',
          'Learn implementation strategies for excellence models',
          'Master self-assessment and benchmarking techniques',
          'Develop organizational transformation capabilities',
          'Create sustainable improvement culture'
        ],
        speakers: [
          {
            name: 'Dr. Michael Excellence',
            title: 'Business Excellence Consultant',
            description: 'Dr. Excellence has over 25 years of experience in implementing business excellence models across various industries globally.',
            imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400'
          },
          {
            name: 'Sarah Leadership',
            title: 'Organizational Development Expert',
            description: 'Sarah specializes in organizational transformation and has helped numerous companies achieve excellence recognition.',
            imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400'
          }
        ],
        courseHighlights: [
          'Comprehensive excellence model frameworks',
          'Practical implementation workshops',
          'Real organizational case studies',
          'Self-assessment tools and methodologies',
          'Excellence award preparation guidance'
        ],
        prerequisites: [
          'Management or leadership experience',
          'Understanding of business processes',
          'Familiarity with quality management concepts',
          'Bachelor\'s degree in business or related field'
        ],
        whyChoose: [
          'Learn from internationally recognized experts',
          'Comprehensive excellence implementation toolkit',
          'Practical, results-oriented approach',
          'Networking with excellence professionals',
          'Pathway to organizational transformation'
        ],
        certificateDescription: 'Participants receive a Business Excellence Implementation Certificate, demonstrating competency in excellence model implementation and organizational transformation.',
        certificateImageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
        certificateUrl: 'https://www.aaa.org/certificates/business-excellence',
        slug: 'business-excellence-model-implementation',
        createdBy: adminUser!.id
      },
      {
        title: 'Environmental Management Systems ISO 14001:2015',
        description: 'Learn to implement and manage Environmental Management Systems according to ISO 14001:2015 standards. This comprehensive course covers environmental policy, objectives, and continuous improvement strategies.',
        category: EventCategory.COURSE,
        duration: '3 Days',
        price: 1199,
        date: new Date('2025-12-10T09:00:00Z'),
        location: 'Online',
        language: 'English',
        maxParticipants: 35,
        isVirtual: true,
        imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400',
        galleryImages: [],
        // galleryImages: [],
        keyLearningOutcomes: [
          'Understand ISO 14001:2015 requirements',
          'Learn environmental aspects identification',
          'Master environmental policy development',
          'Implement environmental monitoring systems',
          'Develop environmental improvement programs'
        ],
        speakers: [
          {
            name: 'Dr. Green Environment',
            title: 'Environmental Management Consultant',
            description: 'Dr. Environment is a certified ISO 14001 Lead Auditor with extensive experience in environmental management systems.',
            imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400'
          }
        ],
        courseHighlights: [
          'Interactive virtual workshops',
          'Environmental impact assessment tools',
          'Compliance monitoring techniques',
          'ISO 14001 implementation templates',
          'Legal requirements guidance'
        ],
        prerequisites: [
          'Basic environmental awareness',
          'Understanding of business operations',
          'Access to reliable internet connection',
          'Interest in sustainability practices'
        ],
        whyChoose: [
          'Expert guidance from certified professionals',
          'Flexible online learning format',
          'Practical implementation tools',
          'Global environmental management network',
          'Immediate workplace application'
        ],
        certificateDescription: 'Participants receive an ISO 14001:2015 Foundation Certificate, demonstrating knowledge of environmental management systems and sustainable practices.',
        certificateImageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400',
        certificateUrl: 'https://www.aaa.org/certificates/iso-14001',
        slug: 'environmental-management-systems-iso-14001-2015',
        createdBy: adminUser!.id
      },
      {
        title: 'Occupational Health and Safety Management ISO 45001:2018',
        description: 'Master the implementation of Occupational Health and Safety Management Systems according to ISO 45001:2018. Learn to create safer workplaces and reduce occupational health and safety risks.',
        category: EventCategory.COURSE,
        duration: '4 Days',
        price: 1399,
        date: new Date('2025-12-10T09:00:00Z'),
        location: 'Kuwait City, Kuwait',
        language: 'English',
        maxParticipants: 25,
        isVirtual: false,
        imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
        galleryImages: [],
        // galleryImages: ['https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400'],
        keyLearningOutcomes: [
          'Understand ISO 45001:2018 requirements',
          'Learn hazard identification and risk assessment',
          'Master incident investigation techniques',
          'Develop safety management programs',
          'Implement worker participation strategies'
        ],
        speakers: [
          {
            name: 'John Safety',
            title: 'Occupational Health and Safety Consultant',
            description: 'John is a certified safety professional with 20 years of experience in implementing OHS management systems across various industries.',
            imageUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200'
          }
        ],
        courseHighlights: [
          'Hands-on risk assessment workshops',
          'Incident investigation case studies',
          'Worker engagement strategies',
          'Safety performance monitoring',
          'Legal compliance guidance'
        ],
        prerequisites: [
          'Basic safety awareness',
          'Understanding of workplace operations',
          'Experience in safety or operations',
          'Willingness to participate in practical exercises'
        ],
        whyChoose: [
          'Expert instruction from certified professionals',
          'Practical, workplace-focused approach',
          'Comprehensive safety management toolkit',
          'Networking with safety professionals',
          'Immediate safety improvement implementation'
        ],
        certificateDescription: 'Participants receive an ISO 45001:2018 Foundation Certificate, demonstrating competency in occupational health and safety management systems.',
        certificateImageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
        certificateUrl: 'https://www.aaa.org/certificates/iso-45001',
        slug: 'occupational-health-safety-management-iso-45001-2018',
        createdBy: adminUser!.id
      },
      {
        title: 'Future of Quality Management: AI and Automation',
        description: 'Explore how artificial intelligence and automation are transforming quality management. Learn about emerging technologies, their applications, and how to prepare your organization for the future of quality.',
        category: EventCategory.WEBINAR,
        duration: '1.5 Hours',
        price: 79,
        date: new Date('2025-12-10T14:00:00Z'),
        location: 'Online',
        language: 'English',
        maxParticipants: 150,
        isVirtual: true,
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
        galleryImages: [],
        // galleryImages: ['https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400'],
        keyLearningOutcomes: [
          'Understand AI applications in quality management',
          'Learn about automated quality control systems',
          'Explore predictive quality analytics',
          'Discover digital transformation strategies',
          'Understand future quality management trends'
        ],
        speakers: [
          {
            name: 'Dr. Tech Innovation',
            title: 'AI & Quality Systems Expert',
            description: 'Dr. Innovation is a leading expert in AI applications for quality management with extensive experience in digital transformation.',
            imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400'
          }
        ],
        courseHighlights: [
          'Live AI demonstrations',
          'Interactive technology showcase',
          'Future trends analysis',
          'Q&A with technology experts',
          'Access to AI resources and tools'
        ],
        prerequisites: [
          'Basic quality management knowledge',
          'Interest in emerging technologies',
          'Access to reliable internet connection',
          'No technical background required'
        ],
        whyChoose: [
          'Cutting-edge insights from technology experts',
          'Understand future quality management trends',
          'Interactive technology demonstrations',
          'Practical guidance for digital transformation',
          'Network with innovation leaders'
        ],
        certificateDescription: 'Participants receive a Future of Quality Management Certificate, demonstrating awareness of AI and automation trends in quality systems.',
        certificateImageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
        certificateUrl: 'https://www.aaa.org/certificates/ai-quality-management',
        slug: 'future-quality-management-ai-automation',
        createdBy: adminUser!.id
      },
      {
        title: 'Crisis Management and Business Continuity Planning',
        description: 'Learn essential crisis management strategies and business continuity planning. Discover how to prepare your organization for unexpected disruptions and maintain operations during challenging times.',
        category: EventCategory.WEBINAR,
        duration: '2 Hours',
        price: 129,
        date: new Date('2025-12-10T15:00:00Z'),
        location: 'Online',
        language: 'English',
        maxParticipants: 100,
        isVirtual: true,
        imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
        galleryImages: [],
        // galleryImages: ['https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400', 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400'],
        keyLearningOutcomes: [
          'Understand crisis management principles',
          'Learn business continuity planning strategies',
          'Master risk assessment for crisis scenarios',
          'Develop emergency response protocols',
          'Implement recovery and resilience measures'
        ],
        speakers: [
          {
            name: 'Crisis Management Expert',
            title: 'Business Continuity Consultant',
            description: 'A seasoned professional with 25 years of experience in crisis management and business continuity planning across various industries.',
            imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400'
          }
        ],
        courseHighlights: [
          'Real crisis scenario case studies',
          'Interactive business continuity planning',
          'Emergency response simulation',
          'Recovery strategy development',
          'Resilience building techniques'
        ],
        prerequisites: [
          'Management or leadership experience',
          'Understanding of business operations',
          'Access to reliable internet connection',
          'Interest in organizational resilience'
        ],
        whyChoose: [
          'Expert guidance from crisis management professionals',
          'Practical tools for immediate implementation',
          'Real-world case studies and examples',
          'Comprehensive crisis management framework',
          'Network with resilience professionals'
        ],
        certificateDescription: 'Participants receive a Crisis Management and Business Continuity Certificate, demonstrating competency in organizational crisis preparedness and response.',
        certificateImageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
        certificateUrl: 'https://www.aaa.org/certificates/crisis-management',
        slug: 'crisis-management-business-continuity-planning',
        createdBy: adminUser!.id
      },
      {
        title: 'Customer Experience Excellence in Digital Age',
        description: 'Discover how to deliver exceptional customer experience in the digital era. Learn about customer journey mapping, digital touchpoints, and creating memorable customer interactions.',
        category: EventCategory.WEBINAR,
        duration: '1.5 Hours',
        price: 89,
        date: new Date('2025-12-10T16:00:00Z'),
        location: 'Online',
        language: 'English',
        maxParticipants: 120,
        isVirtual: true,
        imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400',
        galleryImages: [],
        // galleryImages: ['https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400', 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400'],
        keyLearningOutcomes: [
          'Understand customer experience principles',
          'Learn digital customer journey mapping',
          'Master customer touchpoint optimization',
          'Develop customer feedback systems',
          'Implement customer experience metrics'
        ],
        speakers: [
          {
            name: 'Customer Experience Guru',
            title: 'Digital CX Strategist',
            description: 'A leading expert in customer experience design with extensive experience in digital transformation and customer journey optimization.',
            imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'
          }
        ],
        courseHighlights: [
          'Interactive customer journey mapping',
          'Digital touchpoint analysis',
          'Customer feedback strategy development',
          'Experience measurement techniques',
          'Best practice case studies'
        ],
        prerequisites: [
          'Basic understanding of customer service',
          'Interest in customer experience',
          'Access to reliable internet connection',
          'No prior CX experience required'
        ],
        whyChoose: [
          'Expert insights from CX professionals',
          'Practical tools for immediate application',
          'Interactive learning format',
          'Comprehensive customer experience framework',
          'Network with customer experience leaders'
        ],
        certificateDescription: 'Participants receive a Customer Experience Excellence Certificate, demonstrating knowledge of digital customer experience strategies and best practices.',
        certificateImageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400',
        certificateUrl: 'https://www.aaa.org/certificates/customer-experience',
        slug: 'customer-experience-excellence-digital-age',
        createdBy: adminUser!.id
      }
    ]

    for (const eventData of sampleEvents) {
      await prisma.event.create({ data: eventData })
    }

    console.log('Comprehensive sample events created')
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  }
} 