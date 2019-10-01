import getUserId from '../utils/getUserId'
const Query = {
    // resolver function to query all users
    users(parent, args, {prisma}, info) {
        const opArgs = {
            skip: args.skip,
            first: args.first,
            orderBy: args.orderBy,
            after: args.after,   
        };
        if(args.query){
            opArgs.where={
                OR:[
                    {
                        name_contains: args.query
                    },
                    {
                       id: args.query
                    },
                    {
                        email: args.query
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
        const opArgs = {
            skip: args.skip,
            first: args.first,
            orderBy: args.orderBy,
            after: args.after,   
        };
        
        if(args.query ){
            opArgs.where = {
                AND: [
                    {
                        location: args.query.location
                    },
                    {
                        state: args.query.state
                    }
                ]
            }
        }else{
            throw new Error("Please provide all required fields inputing the state and location correctly");
        }
        
        return prisma.query.experiences(opArgs, info);
    },

     myExperiences(parent, args, {prisma, request}, info){
        const userId = getUserId(request);
        
        const opArgs = {
            skip: args.skip,
            first: args.first,
            orderBy: args.orderBy,
            after:args.after,
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
       
        const opArgs = {
            skip: args.skip,
            first: args.first,
            orderBy: args.orderBy,
            after: args.after,   
        };
        
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
                        make_contains: args.query.make
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
        const opArgs = {
            skip: args.skip,
            first: args.first,
            orderBy: args.orderBy,
            after: args.after,   
        };

       
        return prisma.query.tips(opArgs, info);
    },
    locations(parent, args, {prisma}, info) {
        const opArgs = {
            skip: args.skip,
            first: args.first,
            orderBy: args.orderBy,
            after: args.after,   
        };

        if(args.query){
            opArgs.where = {
                OR: [
                    {
                        longitude : args.query
                    },
                    {
                        latitude : args.query
                    },
                ]
            }
        }

        return prisma.query.locations(opArgs, info);

    },
    myLocations(parent, args, {prisma, request}, info){
        const userId = getUserId(request);
        const opArgs = {
            skip: args.skip,
            first: args.first,
            orderBy: args.orderBy,
            after: args.after,
            where:{
                author:{
                    id: userId
                }
            }   
        };
        return prisma.query.locations(opArgs, info);
    },
    location(parent, args, {prisma, request}, info){
        const userId = getUserId(request);
        const opArgs={};

        if(args){
            opArgs.where={
                id: args.id,
                author:{
                    id:userId
                }
            };
        }
        
        return prisma.query.location(opArgs, info);
    },
    anonLocations(parent, args, {prisma}, info) {
        const opArgs = {
            skip: args.skip,
            first: args.first,
            orderBy: args.orderBy,
            after: args.after,   
        };
        if(args.query){
            opArgs.where = {
                OR: [
                    {
                        longitude : args.query
                    },
                    {
                    latitude : args.query
                    },
                ]
            }
        }

        return prisma.query.anonLocations(opArgs, info);

    },
    anonLocation(parent, {id}, {prisma}, info){
        const opArgs={};

        if(id){
            opArgs.where={ id }
        }
        
        return prisma.query.anonLocation(opArgs, info);
    },

}

// export the query as default to be imported in entry point
export { Query as default }