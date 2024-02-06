
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();//we need to use prisma client

async function main() {
//creating a query to to add a row to the User table with email
//and name's value given
  await prisma.user.create({
    data:{
        email:"abc@gmail.com",
        name:"abc"
    }
  })
}
//once the query succeeds or fails we disconnect the client
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
//the prototype of the code is taken from the docs