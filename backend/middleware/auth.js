const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET' )
    console.log(decodedToken)
    const userId = decodedToken.userId
    if (userId != req.headers.id ) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({
      error: error | 'Invalid request!'})
    }
  }