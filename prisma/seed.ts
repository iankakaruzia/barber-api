import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'node:crypto';

const prisma = new PrismaClient();

const slots = [
  {
    value: '09:00',
  },
  {
    value: '10:00',
  },
  {
    value: '11:00',
  },
  {
    value: '12:00',
  },
  {
    value: '13:00',
  },
  {
    value: '14:00',
  },
  {
    value: '15:00',
  },
  {
    value: '16:00',
  },
  {
    value: '17:00',
  },
  {
    value: '18:00',
  },
];
const workingDays = [
  {
    day: 'monday',
  },
  {
    day: 'tuesday',
  },
  {
    day: 'wednesday',
  },
  {
    day: 'thursday',
  },
  {
    day: 'friday',
  },
];

async function main() {
  const barbersCount = await prisma.barber.count();

  if (barbersCount === 0) {
    await prisma.barber.create({
      data: {
        id: randomUUID(),
        name: 'John Doe',
        pictureUrl: 'https://picsum.photos/200',
        slots: {
          create: slots,
        },
        workingDays: {
          create: workingDays,
        },
      },
    });

    await prisma.barber.create({
      data: {
        id: randomUUID(),
        name: 'Chris Evans',
        pictureUrl: 'https://picsum.photos/200',
        slots: {
          create: slots,
        },
        workingDays: {
          create: workingDays,
        },
      },
    });

    await prisma.barber.create({
      data: {
        id: randomUUID(),
        name: 'Jenna Ortega',
        pictureUrl: 'https://picsum.photos/200',
        slots: {
          create: slots,
        },
        workingDays: {
          create: workingDays,
        },
      },
    });
  }
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
