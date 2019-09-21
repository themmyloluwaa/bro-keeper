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
    }
}

export { Subscription as default }