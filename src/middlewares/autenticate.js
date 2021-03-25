const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if(!authorization){
    return res.status(401).json({ message: 'Você precisa estar logado para acessar esta rota'})
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const { sub } = jwt.verify(token, 'secretekeynavedex');
    req.userId = sub;
    return next();
  } catch (error) {
    return res.status(400).json({ message: error.message});
  }
}