import jwt from 'jsonwebtoken'
const getUserId = ({request}, requireAuth = true) => {
const { headers } = request;
const {authorization} = headers;

        if(authorization) {
            const token = authorization.replace('Bearer ', '');
            const decoded = jwt.verify(token, 'wonderful');
            
            return decoded.userId;
        }
        if(requireAuth){
            throw new Error("Authentication required");
        }

        return null;
}

export {getUserId as default};