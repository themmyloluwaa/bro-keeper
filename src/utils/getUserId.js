import jwt from 'jsonwebtoken'
const getUserId = ({request}) => {
const { headers } = request;
const {authorization} = headers;

if(!authorization) {
    throw new Error("Authentication required");
}

const token = authorization.replace('Bearer', '');
const decoded = jwt.verify(token, 'wonderful');

return decoded.userId;
}

export {getUserId as default};