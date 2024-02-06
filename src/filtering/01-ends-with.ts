
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['info', 'query']
})
/**
 * Here we are sending a query such that find those users in the User table whose email ends with "gmail.com" AND
 * atleast one post is published ,and then return the array of users (where individual user object should also have 
 * the posts array {which weere actually not going to be displayed if the include posts was not mentioned})
 */
async function main() {
  let res = await prisma.user.findMany({
    where: {
        email: {
          endsWith: 'gmail.com',
        },
        posts: {
          /// Has atleast one post published
          some: {
            published: true,
          },
        },
      },
      include: {
        posts: {
          where: {
            published: true,
          },
        },
      },
    })
    console.log(res);
    
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