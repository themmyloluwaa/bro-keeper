import uuidv4 from 'uuid/v4'
import { Prisma } from 'prisma-binding'


const Mutation = {
    // mutation to create experience
    // prisma was destructured from the ctx or context parameter passed from the entry point
    // new prisma instance would be returned;
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
    // mutation to delete experience
    // async function was used as the data gotten back is a promise
    // prisma.exist was used to check if experience exists in database and returns a boolean;
   async deleteExperience(parent, args, { prisma }, info) {
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
    // mutation to update  experience, 

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

    // mutation to create car
     createCar(parent, args, { prisma }, info) {
        const {data } = args;
        return prisma.mutation.createCar({
          data: {
            color: data.color,
            plateNumber: data.plateNumber,
            passengers: data.passengers,
            make: data.make,
            description: data.description
          }
        },info)
        
    },
    // mutation to update car
    async updateCar(parent, args, { prisma }, info) {
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
    // mutation to delete car
    async deleteCar(parent, args, { prisma }, info) {
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
    },
    // mutation to create tip
    createTip(parent, args, { prisma }, info) {
        const {data } = args;
        return prisma.mutation.createTip({
          data: {
           yourTip: data.yourTip,
           twitterHandle: data.twitterHandle
          }
        },info)
        
    },
    // mutation to update tip
    async updateTip(parent, args, { prisma }, info) {
        const tipExists = await prisma.exists.Tip({id: args.id});
                          

        if (!tipExists) {
            throw new Error('Tip not found')
        }
        
           return prisma.mutation.updateTip({
                where:{
                    id:args.id
                },
                data:args.data
            }, info)
    },

    // mutation to delete tip
    async deleteTip(parent, args, { prisma }, info) {
        const tipExists = await prisma.exists.Tip({id: args.id});
                          

        if (!tipExists) {
            throw new Error('Not found')
        }

        return prisma.mutation.deleteTip(
            {
                where:{

                    id:args.id
                }
            },info)
    },
}

// export mutation to be imported in  entry server
export { Mutation as default }