// Standalone script to seed database.
// This does not use prisma's seeding mechanism because nanoid doesn't work with it (runs into common-js ESM import issue[1]).
//
// [1]: https://github.com/ai/nanoid/issues/365

import { hash } from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

// TODO: Use Id library instead to keep id generation consistent!
const IDS = {
  userId: nanoid(),
  orgId: nanoid(),
  orgMembershipId: nanoid(),
}

async function main() {
  const organizationsCount = await prisma.organization.count();
  if (organizationsCount > 0) {
    console.log("DB is already seeded. No need to seed it again");
    return;
  }

  await prisma.$transaction(async (tx) => {
    // TODO: Use service layer instead to keep creation consistent!
    const createdUser = await tx.user.create({
      data: {
        id: IDS.userId,
        email: 'admin@fkadeal.com',
        firstName: 'fkadeal',
        lastName: 'admin',
        passwordHash: await hash('password', 12),
        forcePasswordReset: true,
      },
    });

    const createdOrg = await tx.organization.create({
      data: {
        id: IDS.orgId,
        name: 'Faris Enterprises',
        slug: '-',
        defaultModel: 'mistral',
        defaultModelType: 'OLLAMA',
      },
    });

    const createdOrgMembership = await tx.orgMembership.create({
      data: {
        id: IDS.orgMembershipId,
        role: 'ADMIN',
        status: 'ACTIVE',
        userId: IDS.userId,
        orgId: IDS.orgId,
      },
    });
  });

  console.log("DB seeded successfully 🎉")
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });
