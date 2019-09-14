import {Prisma} from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://192.168.99.100:4467/'
})

prisma.query.cars(null, '{id color make}')
.then(data => console.log(data));