const jwt = require('jsonwebtoken')
const config = require('config')



module.exports = function auth(req, res, next) {
  const privateKey = config.get('jwtPrivateKey')
 // const token = req.header('x-auth-token');
  const token = req.cookies.x_auth_token;
  if (!token) return res.status(401).send('Access denied. No token provided'); //nanti ganti pake pug
  try {
    const decoded = jwt.verify(token, privateKey)
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('invalid token.... ') // nanti ganti pake pug

  }
}