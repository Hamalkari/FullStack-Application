const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const { ExtractJwt } = require("passport-jwt");
const config = require("./config");
const User = require("./models/users.model");

// JsonWebToken Strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.secretKey
    },
    async (payload, done) => {
      try {
        // Находим нашего пользователя по ид
        const user = await User.findById(payload._id);

        // Если не нашли пользователя не разрешаем переход
        if (!user) {
          return done(null, false);
        }

        // Если же нашли разрешаем
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// Local Strategy

passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    async (email, password, done) => {
      try {
        // Находим наше пользователя в базе данных
        const user = await User.findOne({ email });

        // Если не нашли пользователя не разрешаем переход
        if (!user) {
          return done(null, false);
        }

        // проверяем сходимость пароля с базой данных
        const isMatchPassword = await user.isValidPassword(password);

        // Если не совпали не разрешаем переход
        if (!isMatchPassword) {
          return done(null, false);
        }

        // Если же совпали разрешаем переход
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
