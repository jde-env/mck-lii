import express from 'express';
import v1Api from "./v1";

function _default() {
    const router = express.Router();
    
    router.use("/v1", v1Api)  // v1 api defined here
    
    // other version api can define...

    return router;
}

const InstanceOf =  _default();
export default InstanceOf;