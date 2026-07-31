import express from 'express';
import api from "../endpoint/index";

function Routes() {
    const router = express.Router();
    
    router.use('/api', api); // api route
    
    // others api can define here...

    return router;
}

export default Routes;