// import prisma from the prisma-binding file and declare a new instance
// passing your typeDefs generated using the graphql cli
// and define your endpoint gotten from docker
// fragmentreplacements was imported from resolver directory and passed together
// into the prisma object that would be run in the nodejs entry point;


import {Prisma} from 'prisma-binding'
import {fragmentReplacements } from './resolvers/index'
const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    fragmentReplacements

})

// export as default
export {prisma as default};