const jwt = require('jsonwebtoken');

module.exports  = (req,res,next) => {
    if(req.method === "OPTIONS") {
        next();
    }
    try{
        const token = req.headers.authorization.split(' ')[1]
        if(!token) {
            return res.status(403).json({message: "User is not authorized "})
        }
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    }catch (e) {
        console.log(e);
        return res.status(403).json({message: "User is not authorized "})
    }
}
