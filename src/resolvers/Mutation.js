import bcrypt from 'bcryptjs';
import genToken from '../utils/genToken'
import getUserId from '../utils/getUserId'
import hashPassword from '../utils/hashPassword'


const Mutation = {
//   check if email is taken before creating user
//    if email is taken, throw this error
// check the length of the password and if secretcode provided is not less than four
// throw error if conditions above return false
// hash password
// create the user and store in a user variable
// return created user and a new token generated for that user
   async createUser(parent, {data}, {prisma}, info){
      const emailTaken = await prisma.exists.User({email: data.email});
      
      if(emailTaken){
          throw new Error('This email has already been used');
      }
      if(data.secretCode.length < 4){
          throw new Error('Please provide a four digit number that you will never forget');
      }
      const password = await hashPassword(data.password)

        const user = await prisma.mutation.createUser({data:{
            ...data,
            password
        }});

        return {
            user,
            token: genToken(user.id)
        };
    },
  async login(parent, args, {prisma}, info){
        const {data} = args;
        const user = await prisma.query.user({
            where:{
                email: data.email
            }
        });
        if(!user){
            throw new Error('Invalid username and password');
        }
       
        const password = await bcrypt.compare(data.password, user.password);

        if(!password){
            throw new Error("Invalid username and password");
        }

        return {
            user,
            token: genToken(user.id)
        }

    },
    async updateUser(parent, {data}, {prisma, request}, info){
        const userId = getUserId(request);
        if(typeof data.password === 'string'){
            data.password = await hashPassword(data.password);
        }
        return prisma.mutation.updateUser({
            where:{
                id:userId
            },
            data
        }, info)
    },
        // check if user exist using the id before deleting
    // if user does not exist, throw error
    // delete user and return all the information about the user
    async deleteUser(parent, args, {prisma, request}, info){
        const userId = getUserId(request);
        const userExists = await prisma.exists.User({id: userId});
        
        if(!userExists){
            throw new Error('User does not exist');
        }

        return prisma.mutation.deleteUser({
            where: {
                id: userId
            }
        }, info);
    }, 
    async changePassword(parent, {secretCode, newPassword}, {prisma, request}, info){
        const userId = getUserId(request);
        const password =  await hashPassword(newPassword)
        const user = await prisma.query.user({
            where:{
                id: userId
            }
        });
        if(!user){
            throw new Error('This user does not exist');
        }
        if(user.secretCode === secretCode){
            return prisma.mutation.updateUser({
                where:{
                    id:userId
                },
               data:{
                   password
               }
            }, info)
        }else{
            throw new Error('Your secret code is not valid, please input the correct four digit secret code you inputed when creating your account');
        }
    },
      // mutation to create experience
    // prisma was destructured from the ctx or context parameter passed from the entry point
    // new prisma instance would be returned;
    createExperience(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
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
            author: {
                connect:{
                    id: userId
                }
            },
            car: {
                connect:{
                    id: data.car
                }
            }
        }
      },info);
        
    },
    // mutation to delete experience
    // async function was used as the data gotten back is a promise
    // prisma.exist was used to check if experience exists in database and returns a boolean;
   async deleteExperience(parent, args, { prisma, request }, info) {
       const userId = getUserId(request);
       const experienceExists = await prisma.exists.Experience({
           id: args.id,
           author:{
               id: userId
           }
       });

       if(!experienceExists) {
           throw new Error("You are not authorized to delete this experience");
       }

        return prisma.mutation.deleteExperience(
            {
                where:{

                    id:args.id
                }
            },info)

    },
    // mutation to update  experience, 

    async updateExperience(parent, {id, data}, { prisma, request }, info) {
        const userId = getUserId(request);
        const experienceExists = await prisma.exists.Experience({
            id,
            author:{
                id: userId
            }
        });
                          

        if (!experienceExists) {
            throw new Error('Unable to delete this experience');
        }
        
           return prisma.mutation.updateExperience({
                where:{
                id
                },
                data
            }, info)
       
    },

    // mutation to create car
     createCar(parent, args, { prisma, request }, info) {
        const {data } = args;
        const userId = getUserId(request);
        return prisma.mutation.createCar({
          data: {
            ...data,
            author: {
                connect:{
                    id: userId
                }
            },
            // experience: {
            //     connect:{
            //         id: data.experience
            //     }
            // }
          }
        },info)
        
    },
    // mutation to update car
    async updateCar(parent, {data, id}, { prisma, request }, info) {
        const userId = getUserId(request);
        const carExists = await prisma.exists.Car({
            id,
            author:{
                id: userId
            }
        });
                          

        if (!carExists) {
            throw new Error('Car not found')
        }
        
           return prisma.mutation.updateCar({
                where:{id},
                data
            }, info)
    },
    // mutation to delete car
    async deleteCar(parent, {id}, { prisma, request }, info) {
        const userId = getUserId(request);
        const carExists = await prisma.exists.Car({
            id,
            author:{
                id: userId
            }
        });
                          

        if (!carExists) {
            throw new Error('Not found')
        }

        return prisma.mutation.deleteCar(
            {
                where:{ id }
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
    async updateTip(parent, {id, data}, { prisma }, info) {
        const tipExists = await prisma.exists.Tip({ id });
                          

        if (!tipExists) {
            throw new Error('Tip not found')
        }
        
           return prisma.mutation.updateTip(
               { where:{ id }, data }, info)
    },

    // mutation to delete tip
    async deleteTip(parent, {id}, { prisma }, info) {
        const tipExists = await prisma.exists.Tip({id});
                          

        if (!tipExists) {
            throw new Error('Not found')
        }

        return prisma.mutation.deleteTip(
            { where:{ id } },info);
    },
    // mutation to create location
    createLocation(parent, args, { prisma, request }, info) {
        const {data } = args;
        // check if authentication was provided
        const userId = getUserId(request);
        return prisma.mutation.createLocation({
          data: {
            ...data,
            author: {
                connect:{
                    id: userId
                }
            },
          }
        },info)
    },
    // mutation to update location
    async updateLocation(parent, args, { prisma, request }, info) {
       
            const userId = getUserId(request);
            const LocationExists = await prisma.exists.Location(
                { id: args.id, author:{ id:userId }});   
                if(!LocationExists){ throw new Error("Location does not exist")};
                return prisma.mutation.updateLocation({
                where:{ id:args.id }, data:args.data }, info)
             
        
    },

    // mutation to delete location
    async deleteLocation(parent, args, { prisma, request }, info) {

            const userId = getUserId(request);
            const LocationExists = await prisma.exists.Location(
                { id: args.id, author:{ id:userId }});   
                // if it doesn't exist, throw error
                if(!LocationExists){ throw new Error("Location does not exist")};
                // if it exist, delete the location
                return prisma.mutation.deleteLocation({
                where:{ id:args.id } }, info); 
    },
     // mutation to create AnonLocation
     createAnonLocation(parent, args, { prisma }, info) {
        const {data } = args;
        return prisma.mutation.createAnonLocation({
          ...data
        },info)
        
    },
    // mutation to update AnonLocation
    async updateAnonLocation(parent, {id, data}, { prisma }, info) {
        const AnonLocationExists = await prisma.exists.AnonLocation({ id });
                          

        if (!AnonLocationExists) {
            throw new Error('Location not found')
        }
        
           return prisma.mutation.updateAnonLocation(
               { where:{ id }, data }, info)
    },

    // mutation to delete AnonLocation
    async deleteAnonLocation(parent, {id}, { prisma }, info) {
        const AnonLocationExists = await prisma.exists.AnonLocation({id});
                          

        if (!AnonLocationExists) {
            throw new Error('Not found')
        }

        return prisma.mutation.deleteAnonLocation(
            { where:{ id } },info);
    },
}

// export mutation to be imported in  entry server
export { Mutation as default }