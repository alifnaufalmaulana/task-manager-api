const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({
      message: 'Token required',
    });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, 'SECRETKEY', (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: 'Invalid token',
      });
    }

    req.userId = decoded.id;

    next();
  });
};

module.exports = verifyToken;
//module.exports = verifyToken;
