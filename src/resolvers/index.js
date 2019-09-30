// all resolvers were imported and extractFragmentReplacements was imported from prisma-binding
// all this is done to enabel the use of fragments in our nodejs server
import { extractFragmentReplacements } from 'prisma-binding'
import Query from './Query'
import Mutation from './Mutation'
import Subscription from './Subscription'
import Experience from './Experience'
import User from './User'
import Location from './Location'
import Car from './Car'
import Tip from './Tip'
import AnonLocation from './AnonLocation'

// resolver functions were passed to a resolvers object and extracted for import in the nodejs entry point
const resolvers = {
    Query,
    Mutation,
    Subscription,
    Experience,
    Car,
    Tip,
    Location,
    User,
    AnonLocation
}

// a new instance of extractFragmentReplacements was called passing all the resolver functions so that
// fields could be extracted from each resolver for fragment usage
const fragmentReplacements = extractFragmentReplacements(resolvers);
// both resolvers and framgmentReplacements were extracted
export {resolvers, fragmentReplacements}