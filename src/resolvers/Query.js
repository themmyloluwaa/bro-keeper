const Query = {
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
    cars(parent, args, { prisma }, info) {
       
        // const opArgs = {};

        // if(args.query){
        //     opArgs.where = {
        //         make_starts_with: args.query
        //     }
        // }
       
       
       
        return prisma.query.cars(null, info);
       
    }
}

export { Query as default }