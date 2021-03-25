const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class SessionController {
  async store(req, res){
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email }});

    if(!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Verifique seus dados e tente novamente'})
    };

    const token = jwt.sign({}, 'secretekeynavedex', {
      expiresIn: '30d',
      subject: `${user.id}`
    });

    delete user.dataValues.password;

    return res.status(200).json({
      user,
      token
    })
  }
}

module.exports = new SessionController();