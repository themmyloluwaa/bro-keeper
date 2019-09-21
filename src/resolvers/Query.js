const Query = {
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
        
        return prisma.query.experiences(opArgs, info);
    }
}

// export the query as default to be imported in entry point
export { Query as default }