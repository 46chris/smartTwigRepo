import express from 'express'; 
import { getNames, regNames} from '../handlers/PlayerHandler.js'

const router = express.Router(); 

router.get('/', getNames);

router.post('/', regNames); 

export default router; 
