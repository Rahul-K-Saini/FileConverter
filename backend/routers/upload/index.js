
import { Router } from 'express';
import { upload } from '../../controllers/upload/index.js';
const router = Router();

router.post('/',upload);

export default router;