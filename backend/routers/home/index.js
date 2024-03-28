import express from 'express'
import {landing} from '../../controllers/home/index.js'

const router = express.Router();

router.get('/',landing)

export default router;