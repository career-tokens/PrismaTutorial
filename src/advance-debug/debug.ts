/// https://github.com/prisma/prisma/issues/5026

import { PrismaClient } from '@prisma/client'

//sometimes when we are viewing the SQL queries in the logs then certain values remain hidden under stuff like $1,$2
//but we want them to be shown and then we pass "log" to prisma client like this
const prisma = new PrismaClient({
    log: [
      {
        emit: "event",
        level: "query",
      },
    ],
  })

async function main() {
    const users = await prisma.user.findMany({
        take: 2,
    });
};

main()
  .then(async () => {
    console.log("done");
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

prisma.$on("query", async (e) => {
    console.log(`${e.query} ${e.params}`)
});