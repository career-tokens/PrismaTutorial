
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
//query to delete as many posts as possible which are basically
//unpublished for the user with id==1
  await prisma.user.update({
    where: {
        id: 1
    },
    data: {
        posts: {
            deleteMany: {
                published: false
            }
        }
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