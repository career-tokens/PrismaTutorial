
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
//query to add a post where the title is "my blog",content is "prisma" and its author is 
//the same user (from User table) who has the id==1
async function main() {
  await prisma.post.create({
    data:{
        title:"my blog",
        content:"prisma",
        author:{
            connect:{
                id:1
            }
        }
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })