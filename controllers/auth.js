const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/user");

exports.join = async (req, res, next) => {
  console.log(req.body);
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect("/join?error=exist");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });

    // passport.authenticate("local", (authError, user, info) => {
    //   req.login([email, password], (loginError) => {
    //     if (loginError) {
    //       return next(loginError);
    //     }
    //   });
    // })(req, res, next);
    return res.status(201).json({ message: "success" });
  } catch (error) {
    return next(error);
  }
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }

      return res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
};
