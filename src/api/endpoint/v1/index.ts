import express from 'express';
import userRoutes from './user/userRoutes';

function _default() {
    const router = express.Router();
    
    router.use("/users", userRoutes)  // finally endpoints

    return router;
}

const InstanceOf =  _default();
export default InstanceOf;