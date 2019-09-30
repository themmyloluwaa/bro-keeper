const Subscription = {
    // experience subscription resolver
    experience: {
        subscribe(parent, args, { prisma }, info){
            return prisma.subscription.experience(null, info)
        }
    },
    // car subscription resolver
    car: {
        subscribe(parent, args, { prisma }, info) {
            return prisma.subscription.car(null, info)
        }
    },
    // experience subscription resolver
    tip: {
        subscribe(parent, args, { prisma }, info) {
            return prisma.subscription.tip(null, info)
        }
    },
    location:{
        subscribe(parent, args, {prisma}, info){
            return prisma.subscription.location(null, info);
        }
    },
    anonLocation:{
        subscribe(parent, args, {prisma}, info){
            return prisma.subscription.anonLocation(null, info);
        }
    },
    
}

export { Subscription as default }