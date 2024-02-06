
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
/**
 * query to create a user under User table with email:"abc@gmail.com",name:"abc" and two posts one with title 
 * "abcs title1" and other with title "abcs title2" such that those posts are correspondingly created in Post table
 * such that their authorId==the user id since they are connected
 */
async function main() {
  await prisma.user.create({
    data: {
     email: "abc@gmail.com",
     name: "abc",
     posts: {
        create: [
            {
                title: "abcs title1"
            },
            {
                title: "abcs title2"
            },
        ]
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