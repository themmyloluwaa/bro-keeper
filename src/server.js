import { GraphQLServer, PubSub } from 'graphql-yoga'
import {resolvers, fragmentReplacements} from './resolvers/index'
import prisma from './prisma'

// declare a new instance of pubsub and pass it to the context for accessibility
// throughout the file;

const pubsub = new PubSub()

// declare a new instance of graphqlserver and pass in required values
// ####### typeDefs is imported from our schema file located in the source folder
// ####### resolvers are passed in from imported files in resolver folder
// context contains files we want accessible throughout our project

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    // resolver function was modifed, extracting all the resolvers into a file called index.js 
    // in resolver directory in src directory. This was done to enable fragments usage and pass fragmentReplacement
    // from prisma down to index.js which is our node entry point
    resolvers,
    context(request){
        return {
            pubsub,
            prisma,
            request
        }
    },
    // fragmentReplacements was imported from index.js file in resolvers directory which contains
    // all resolver function passed and a extractFragmentReplacement call that is imported from prisma-binding
    fragmentReplacements
})

export {server as default}