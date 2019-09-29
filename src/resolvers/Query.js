import getUserId from '../utils/getUserId'
const Query = {
    // resolver function to query all users
    users(parent, args, {prisma}, info) {
        const opArgs = {};
        if(args.query){
            opArgs.where={
                OR:[
                    {
                        name_contains: args.query
                    },
                    {
                        email_contains: args.query
                    }
                ]
            }
        } 
        return prisma.query.users(opArgs, info);
    },

    me(parent, args, {prisma, request}, info){
        const userId = getUserId(request);
        return prisma.query.user({where:{ id: userId }}, info);
    },
    // resolver function to query all or specified experiences based on the location or state
    experiences(parent, args, {  prisma }, info) {
        const opArgs = {};
        
        if(args.query){
            opArgs.where = {
                AND: [
                    {
                        location_contains: args.query.location
                    },
                    {
                        state_contains: args.query.state
                    }
                ]
            }
        }
        
        return prisma.query.experiences(opArgs, info);
    },
     myExperiences(parent, args, {prisma, request}, info){
        const userId = getUserId(request);
        const opArgs = {
            where:{
                author:{
                    id: userId
                }
            }
        };


        return prisma.query.experiences(opArgs, info);

    },
   async experience(parent, args, {prisma, request}, info){
        const userId = getUserId(request, false);

        const experiences = await prisma.query.experiences({
            where:{ id: args.id,
                OR:[{
                    author: { id: userId }
                }]
                }
             }, info);
        if(experiences.length === 0){
            throw new Error("Experience Not Found");
        }
        return experiences[0];

    },
    // resolver function to query all cars depending on operation arguements passed;
    cars(parent, args, { prisma }, info) {
       
        const opArgs = {};
        
        if(args.query){
            opArgs.where = {
                OR: [
                    {
                        color: args.query.color
                    },
                    {
                        plateNumber: args.query.plateNumber
                    },
                    {
                        passengers: args.query.passengers
                    },
                    {
                        make: args.query.make
                    },
                    {
                        description_contains: args.query.description
                    }
                ]
            }
        }
        
        return prisma.query.cars(opArgs, info);       
    },
    // resolver to query all tips
    tips(parent, args, {  prisma }, info) {
        const opArgs = {};

       
        return prisma.query.tips(opArgs, info);
    },
    locations(parent, args, {prisma}, info) {
        const opArgs = {};
        opArgs.where = {
            OR: [
                {
                    id: args.id
                },
                {
                   latitude_contains : args.query
                },
            ]
        }

        return prisma.query.locations(opArgs, info);

    },
    location(parent, args, {prisma}, info){
        return prisma.query.location({ where: {id: args.id}}, info);
    }
}

// export the query as default to be imported in entry point
export { Query as default }