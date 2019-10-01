import jwt from 'jsonwebtoken';
const genToken = (userId) =>{
   return jwt.sign({userId }, 'wonderful', {expiresIn: '7 days'});
}

export {genToken as default};