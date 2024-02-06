
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    //query to update the user with the id==1 such that the name should be changed to "mainak"
  await prisma.user.update({
    where: {
        id: 1
    },
    data: {
        name: "mainak"
    }
  })
}

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