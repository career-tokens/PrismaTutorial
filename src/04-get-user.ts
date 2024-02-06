import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
//query to fetch all the users
  const users = await prisma.user.findMany({})
  //you could also write 
//   await prisma.user.findMany({
//     where:{
//         email:"main@gmail.com"
//     }
//   })
//such that you could have got the users with the same mail
  console.log(users)
  //here we are talking about a specific user , the above feature returned an array rather
  const user=await prisma.user.findUnique({
    where:{
        id:1
    },
    include:{
        posts:true
    }
  });
  console.log(user)
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