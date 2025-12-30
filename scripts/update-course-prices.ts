import { prisma } from '../lib/prisma'

async function updateCoursePrices() {
    try {
        console.log('Updating training course prices to $480...')

        const result = await prisma.event.updateMany({
            where: {
                category: 'COURSE'
            },
            data: {
                price: 480
            }
        })

        console.log(`Updated ${result.count} courses to $480`)
        process.exit(0)
    } catch (error) {
        console.error('Error updating course prices:', error)
        process.exit(1)
    }
}

updateCoursePrices()
