import { prisma } from './lib/prisma.ts';

async function checkCourse() {
    try {
        const courses = await prisma.event.findMany({
            where: {
                title: {
                    contains: 'Approved Consultants',
                    mode: 'insensitive'
                }
            }
        });

        console.log('Found courses:', JSON.stringify(courses, null, 2));
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkCourse();
