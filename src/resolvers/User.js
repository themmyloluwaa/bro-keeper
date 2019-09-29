import getUserId from '../utils/getUserId'
const User = {
    email:{
        // email changed to object with two fields, fragment which is like a constant that
        // extracts certain fields from schema definition and resolve function which does all
        // the work
        fragment: 'fragment userId on User { id } ',
        resolve(parent, args, {prisma, request}, info){
            const userId = getUserId(request, false );
    
            if(userId && userId === parent.id){
                return parent.email;
            }else{
                return null;
            }
        }
    }
}

export { User as default }