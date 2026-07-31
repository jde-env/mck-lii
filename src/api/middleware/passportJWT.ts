import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { jwtConfig } from '../../conf/jwtConfig';
import User from '../models/User'; // Import your User model

// Define user fields for TypeScript typing
interface IUser {
    id: string;
    username: string;
}

interface JwtPayload {
    id: string;
}

function configureJwtStrategy(passport: typeof import('passport')) {
    // JWT strategy for token validation
    passport.use(
        new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from Bearer header
                secretOrKey: jwtConfig.secret, // Secret key for token verification
            },
            async (jwtPayload: JwtPayload, done) => {
                try {
                    // Find the user by ID from the JWT payload
                    const userDoc = await User.findById(jwtPayload.id).exec();
                    const user: IUser | null = userDoc ? (userDoc.toObject() as unknown as IUser) : null;
                    if (!user) {
                        return done(null, false, { message: 'Invalid token or user not found' });
                    }
    
                    // Successful authentication
                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    return passport;
}

export default configureJwtStrategy;
