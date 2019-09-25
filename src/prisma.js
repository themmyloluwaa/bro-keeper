// import prisma from the prisma-binding file and declare a new instance
// passing your typeDefs generated using the graphql cli
// and define your endpoint gotten from docker


import {Prisma} from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://192.168.99.100:4467/'

})

// export as default
export {prisma as default};