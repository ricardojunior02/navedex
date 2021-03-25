const User = require('../models/Users');
const bcrypt = require('bcryptjs');

class UserController {
  async store(req, res){
    const { email, password } = req.body;

    if(email === '' || password === ''){
      return res.status(400).json({ message: 'Os campos de email e senha são obrigatórios'})
    }
    
   try {
   
    const emailExist = await User.findOne({ where: { email } });

    if(emailExist) {
      return res.status(400).json({ message: 'E-mail já existe'});
    }

    const hashPassword = await bcrypt.hash(password, 8);
    
    const user = await User.create({email, password: hashPassword});

    delete user.dataValues.password;

    return res.status(201).json(user);

   } catch (error) {
     return res.status(400).json(error.message);
   }
  }
}

module.exports = new UserController();