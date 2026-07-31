import express from "express";
import session from 'express-session';
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { MongoDBConnection } from "../bin/db";
import Routes from "./api/routes";
import bodyParser from "body-parser";
import passport from 'passport';
import passportJWT from "./api/middleware/passportJWT";
import passportLocal from "./api/middleware/passportLocal";
import { jwtConfig } from "./conf/jwtConfig";

function defindAPI() {        
    const app = express();

    // Database connection
    MongoDBConnection();

    // Middleware
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    app.use(cors());
    app.use(helmet());
    app.use(morgan('dev'));

    // Configure express-session
    app.use(session({
        secret: jwtConfig.secret, // Replace with a secure secret key
        resave: false,
        saveUninitialized: false,
    }));

    // Initialize Passport and restore authentication state, if any, from the session
    app.use(passport.initialize());
    app.use(passport.session());

    passportJWT(passport);
    passportLocal(passport);

    // Routes
    app.use(Routes());

    return app;
}

const InstanceOfAPP = defindAPI();
export default InstanceOfAPP;
