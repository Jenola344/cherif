import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "file:./dev.db"
        }
    }
});

async function main() {
    console.log('Start seeding simplified...');
    try {
        const count = await prisma.category.count();
        console.log('Current category count:', count);
    } catch (e) {
        console.error(e);
    }
    console.log('End seeding simplified.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
