import jwt from 'jsonwebtoken'
const getUserId = (request, requireAuth = true) => {

const authorization = request.request ?
              request.request.headers.authorization :
              request.connection.context.Authorization;

        if(authorization) {
            const token = authorization.replace('Bearer ', '');
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            return decoded.userId;
        }
        if(requireAuth){
            throw new Error("Authentication required");
        }

        return null;
}

export {getUserId as default};