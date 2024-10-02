const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/user");

exports.join = async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res
        .status(400)
        .json({ message: "이미 이메일로 생성된 계정이 있습니다." });
    }
    const hash = await bcrypt.hash(password, 12);
    const createdUserResponse = await User.create({
      email,
      nick,
      password: hash,
    });

    return req.login(createdUserResponse, (loginError) => {
      if (loginError) {
        return next(loginError);
      }

      const userData = {
        email: createdUserResponse.email,
        nick: createdUserResponse.nick,
        admin: createdUserResponse.admin,
      };

      return res.status(200).json(userData);
    });
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
      const userData = {
        email: user.dataValues.email,
        nick: user.dataValues.nick,
        admin: user.dataValues.admin,
      };

      return res.status(200).json(userData);
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.clearCookie("connect.sid", { path: "/" });
      res.status(200).json({ message: "로그아웃 성공" });
    });
  });
};
