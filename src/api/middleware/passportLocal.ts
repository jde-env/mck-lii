import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../models/User'; // Import your User model

// Define user fields for TypeScript typing
interface IUser {
  id: string;
  username: string;
  password: string;
}

function configureLocalStrategy(passport: typeof import('passport')) {
  // Local strategy for username and password authentication
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'username', // Field name in the request body
        passwordField: 'password',
      },
      async (username, password, done) => {
        try {
          // Find the user by username
          const userDoc = await User.findOne({ username }).exec();
          const user: IUser | null = userDoc ? (userDoc.toObject() as unknown as IUser) : null;
          if (!user) {
            return done(null, false, { message: 'Invalid username or password' });
          }
  
          // Compare the password with the hashed password in the database
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return done(null, false, { message: 'Invalid username or password' });
          }
  
          // Successful authentication
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  
  // Serialize user (saves user id in session)
  passport.serializeUser((user: any, done) => {
      done(null, (user as IUser).id);
  });
  
  // Deserialize user (retrieves full user info from id)
  passport.deserializeUser(async (id: string, done) => {
    try {
      const userDoc = await User.findById(id).exec();
      const user: IUser | null = userDoc ? (userDoc.toObject() as unknown as IUser) : null;
      if (user) {
          done(null, user);
      } else {
          done({ message: 'unknown user' }, null);
      }
    } catch (error) {
      done(error);
    }
  });

  return passport;
}

export default configureLocalStrategy;
