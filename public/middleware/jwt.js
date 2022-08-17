const jwt = require('jsonwebtoken');

exports.getToken = (id,username) => {
    const payload = {
        id,
        username
    }
    return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: '24h'});
}
exports.verifyToken = (token) => {
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
              err = {
                name: 'JsonWebTokenError',
                message: 'jwt malformed'
              }
              return err;
        }
       return decoded;
    });
}
