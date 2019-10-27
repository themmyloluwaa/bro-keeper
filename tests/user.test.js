import 'cross-fetch/polyfill'
import ApolloBoost, {gql} from 'apollo-boost';
import prisma from '../src/prisma';
import bcrypt from 'bcryptjs';


const client = new ApolloBoost({
    uri: "http://localhost:4000"
  });

  beforeEach(async () => {
    await prisma.mutation.deleteManyUsers();
    await prisma.mutation.deleteManyLocations();
    await prisma.mutation.deleteManyCars();
    await prisma.mutation.deleteManyExperiences();
    await prisma.mutation.deleteManyAnonLocations();
    await prisma.mutation.deleteManyTips();
    const user = await prisma.mutation.createUser({
      data:{
        name:"phil",
        email:"phil@example.com",
        password: bcrypt.hashSync('123456789'),
        secretCode: 1234
      }
    });
    const carOne = await prisma.mutation.createCar({
      data:{
        color:"red",
        passengers: 3,
        author:{
          connect:{
            id: user.id
          }
        }
      }
    });

    const carTwo = await prisma.mutation.createCar({
      data:{
        color:"red",
        passengers: 3,
        author:{
          connect:{
            id: user.id
          }
        }
      }
    });
    const experOne = await prisma.mutation.createExperience({
      data:{
        location:"Kubwa",
        state:"Abuja",
        destination:"Arab road",
        date:"November 2019",
        description:"Fat guys in the car",
        robbed: false,
        author:{
          connect:{
            id: user.id
          }
        },
        car:{
          connect:{
            id: carOne.id
          }
        }
      }
    });

    const experTwo = await prisma.mutation.createExperience({
      data:{
        location:"Kubwa",
        state:"Abuja",
        destination:"Arab road",
        date:"November 2019",
        description:"Fat guys in the car",
        robbed: true,
        author:{
          connect:{
            id: user.id
          }
        },
        car:{
          connect:{
            id: carTwo.id
          }
        }
      }
    });

  const tip = await prisma.mutation.createTip({
    data:{
      yourTip: "Stay close to the door",
      twitterHandle:"@solape"
    }
  });

  const location = await prisma.mutation.createLocation({
    data:{
      longitude: 1000.200912,
      latitude: 2000.19922933,
      author:{
        connect:{
          id: user.id
        }
      }
    }
  });

    const anonLocation = await prisma.mutation.createAnonLocation({
      data:{
        longitude: 1000.200912,
        latitude: 2000.19922933
      }
    })
  },30000);

  test('should create user', async () => {
    const createUser = gql`
    mutation{
      createUser(
        data:{
          name:"Temiloluwa",
          email:"temi@temi.com",
          password:"123456789",
          secretCode: 1234
        }
      ){
        user{
          id
        },
        token
      }
    }
    `
    const response = await client.mutate({
      mutation: createUser
    })

    const exist = await prisma.exists.User({id: response.data.createUser.user.id});

    expect(exist).toBe(true);
  }, 30000);

  test('should return user profile', async () => {
    const userData = gql`
      query{
        users {
          id
          name
          email
        }
      }
    `
    const response = await client.query({
      query: userData
    });

    expect(response.data.users.length).toBe(1)
    expect(response.data.users[0].name).toBe('phil')
  });

  test('should return users experience', async () => {
    const getExperience = gql`
      query{
        experiences{
          id
          location
          state
          destination
          date
        }
      }
    `

    const response = await client.query({
      query: getExperience
    });

    expect(response.data.experiences.length).toBe(2)
  });


  test('should return car query', async () => {
    const getCar = gql`
      query{
        cars{
          id
          make
        }
      }
    `

    const response = await client.query({query:getCar});

    expect(response.data.cars.length).toBeGreaterThan(0);
  });

  test('should return tip query', async () => {
    const getTip = gql`
      query{
        tips{
          id
          yourTip
        }
      }
    `

    const response = await client.query({query:getTip});

    expect(response.data.tips.length).toBeGreaterThan(0);
  })
  
  test('should return anonLocation', async ()=>{
    const getLocation = gql`
      query{
        anonLocations{
          latitude
        }
      }
      `

      const response = await client.query({query:getLocation});

      expect(response.data.anonLocations.length).toBeGreaterThan(0);
  },30000)