const userCtl = {}

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const moment = require('moment');

userCtl.getUsers = async ( _req,res )=> {
  const users = await User.find();

  users.forEach(element => {
    const test = moment(element.createdAt).format('l');
    element.createdAt = test
    console.log(element);
  });
  res.json({listaUsuarios: users, success: true});
}

userCtl.registerUser = async( req,res ) => {
  const newUser = new User(req.body);

  User.addUser(newUser,async(err, user, done) => {
    try {
      if(!user){
        return res.json({success: false, message: 'El correo ya existe..!'});
      }
      res.json({ success: true, message: 'Se ha registrado el usuario exitosamente' });
    } catch (err) {
      res.json({success: false, message: 'El correo ya existe..!'});
      next(err);
    }

  });
}

userCtl.loginUser = async( req,res )=> {
  const { email, password  } = req.body;
  User.checkIfEmailExist(email, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({success: false, message: 'El correo no existe'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign({data: user}, process.env.SECRET, {
          expiresIn: 604800   // 1 week: 604800//  1 day 1440 //60 one minute
        });
        const userLogin = {
          id: user._id,
          username:user.username,
          email: user.email,
          updatedAt: user.updatedAt,
          theme: user.theme,
          lang: user.lang
        }
        res.json({
          success: true,
          token: token,
          user: userLogin
        })
      } else {
        return res.json({success: false, message: 'Contraseña incorrecta'});
      }
    });
  });

}

userCtl.getUserById = async ( req,res )=> {
  const user =  await User.findById(req.params.id);
  res.send({success: true, usuario: user});

}
userCtl.editUser = async ( req,res )=> {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.send({success: true, message: 'Usuario actualizado'});
}

userCtl.deleteUser = async( req,res )=> {
  await User.findByIdAndDelete(req.params.id);
  res.send({success: true, message: 'Usuario eliminado'});
}

userCtl.editTheme = async ( req,res )=> {
  const { theme } = req.body;
  await User.findByIdAndUpdate(req.body.userId, {theme});
  res.send({success: true, message: 'El tema ha sido actualizado exitosamente.'});
}

module.exports = userCtl;
