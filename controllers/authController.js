const User = require('../models/User');

const bcrypt = require('bcryptjs');

module.exports = class AuthController {
  static login(req, res) {
    const loginOn = `  <header class="header">
    <div class="logo">
      <img src="./img/LogoTeste.svg" alt="logo">
    </div>
  </header>`;
    res.render('auth/login', { loginOn });
  }

  static async loginPost(req, res) {
    const { user_name, password } = req.body;

    // find user
    const user = await User.findOne({ where: { user_name: user_name } });
    if (!user) {
      req.flash(
        'message',
        'Usuario não encontrado, verifique as informações digitadas',
      );
      res.redirect('/');
      return;
    }

    // check if password match
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      req.flash('message', ' verifique as informações digitadas');
      res.redirect('/login');
      return;
    }

    // initialize session
    req.session.userid = user.id;
    req.flash('message', 'Login realizado com sucesso');

    req.session.save(() => {
      res.redirect('/movimentacoes');
      return;
    });
  }

  static async registerPost(req, res) {
    const { name, surname, user_name, password, confirmpassword } = req.body;
    // password math validation
    if (password != confirmpassword) {
      req.flash('message', 'As senhas não conferem, digite novamente!');
      res.render('auth/login');
      return;
    }

    // check if user exists
    const checkIfUserExists = await User.findOne({
      where: { user_name: user_name },
    });

    if (checkIfUserExists) {
      req.flash('message', 'O nome de usuario já está em uso!');
      res.render('auth/login');

      return;
    }

    // create a password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
      name,
      surname,
      user_name,
      password: hashedPassword,
    };

    try {
      const createdUser = await User.create(user);

      // initialize session

      req.session.userid = createdUser.id;
      req.flash('message', 'Cadastro realizado com sucesso');

      req.session.save(() => {
        res.redirect('/movimentacoes');
      });
    } catch (err) {
      console.log(err);
    }
  }

  static logout(req, res) {
    req.session.destroy();
    res.redirect('/');
  }
};
