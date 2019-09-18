import uuidv4 from 'uuid/v4'
import { Prisma } from 'prisma-binding'

const Mutation = {
    createExperience(parent, args, { prisma }, info) {
        const {data } = args;
      return prisma.mutation.createExperience({
        data: {
            location: data.location,
            state: data.state,
            destination: data.destination,
            description: data.description,
            time: data.time,
            date: data.date,
            robbed: data.robbed,
            items: data.items,
            car: {
                connect:{
                    id: data.car
                }
            }
        }
      },info)
        
    },
   async deleteExperience(parent, args, { db }, info) {
        const experienceExists = await prisma.exists.Experience({id: args.id});
                          

        if (!experienceExists) {
            throw new Error('Not found')
        }

        return prisma.mutation.deleteExperience(
            {
                where:{

                    id:args.id
                }
            },info)

    },
    async updateExperience(parent, args, { prisma }, info) {
        const userExists = await prisma.exists.Experience({id: args.id});
                          

        if (!userExists) {
            throw new Error('Not found')
        }
        
           return prisma.mutation.updateExperience({
                where:{
                    id:args.id
                },
                data:args.data
            }, info)
       
    },
     createCar(parent, args, { pubsub }, info) {
        
    },
    async updateCar(parent, args, { pubsub }, info) {
        const carExists = await prisma.exists.Car({id: args.id});
                          

        if (!carExists) {
            throw new Error('Car not found')
        }
        
           return prisma.mutation.updateCar({
                where:{
                    id:args.id
                },
                data:args.data
            }, info)
    },
    async deleteCar(parent, args, { pubsub }, info) {
        const carExists = await prisma.exists.Car({id: args.id});
                          

        if (!carExists) {
            throw new Error('Not found')
        }

        return prisma.mutation.deleteCar(
            {
                where:{

                    id:args.id
                }
            },info)
    }
}

export { Mutation as default }