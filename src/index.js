// import needed files, pubsub for subscription, graphqlserver for node server
// and all resolver files.
import { GraphQLServer, PubSub } from 'graphql-yoga'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import Experience from './resolvers/Experience'
import User from './resolvers/User'
import Location from './resolvers/Location'
import Car from './resolvers/Car'
import Tip from './resolvers/Tip'
import prisma from './Prisma'

// declare a new instance of pubsub and pass it to the context for accessibility
// throughout the file;

const pubsub = new PubSub()

// declare a new instance of graphqlserver and pass in required values
// ####### typeDefs is imported from our schema file located in the source folder
// ####### resolvers are passed in from imported files in resolver folder
// context contains files we want accessible throughout our project

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription,
        Experience,
        Car,
        Tip,
        Location,
        User
    },
    context(request){
        return {
            pubsub,
            prisma,
            request
        }
    }
})

// started server and passed resolver functions
server.start(() => {
    console.log('The server is up!')
})