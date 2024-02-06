
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['info', 'query']
})
/**
 * Here we are trying to implement pagination sort of thing
 * where lets say for page 1 we fetch 10 items , then when user 
 * moves to page 2 , then we will fetch next 10 items
 * in terms of SQL , this would look like this:
 * SELECT * FROM question OFFSET 0 LIMIT 10
 * SELECT * FROM question OFFSET 10 LIMIT 10
 * SELECT * FROM question OFFSET 20 LIMIT 10
 * Basically the first line means skip(OFFSET) 0 items and then give the next 10 items(LIMIT)
 * Simiarly second line means skip first 10 items and then give the next 10 items
 * Lets see corresponding implementation using prisma
 */
async function main() {
  let res = await prisma.post.findMany({
    take: 10,
    skip: 10,
  })
  //basically means skip first 10 items and then give the next 10 items
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