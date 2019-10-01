import getUserId from '../utils/getUserId'
const Subscription = {
    // experience subscription resolver
    experience: {
        subscribe(parent, args, { prisma }, info){
            return prisma.subscription.experience(null, info)
        }
    },
    myExperience: {
        subscribe(parent, args, { prisma, request }, info){
            const userId = getUserId(request)
            return prisma.subscription.experience({
                where:{
                    node:{
                        author:{
                            id: userId
                        }
                    }
                }
            }, info)
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
        subscribe(parent, {id}, {prisma}, info){
            return prisma.subscription.location(
                {
                    where:{
                        node:{
                         id   
                        }
                    }
                }, info);
        }
    },
    myLocation: {
        subscribe(parent, args, { prisma, request }, info){
            const userId = getUserId(request)
            return prisma.subscription.location({
                where:{
                    node:{
                            
                        author:{
                            id: userId
                        },
                },
                
                    
                }
            }, info)
        }
    },
    anonLocation:{
        subscribe(parent, {id}, {prisma}, info){
            return prisma.subscription.anonLocation(
                {
                    where:{
                        node:{
                         id   
                        }
                    }
                }, info);
        }
    },
    
}

export { Subscription as default }