import express from 'express';
import auth from './controllers/auth.js';
import createRecord from './controllers/create.js';
import deleteRecord from './controllers/delete.js';
import { getAllRecords, getOneRecord } from './controllers/get.js';
import updateRecord from './controllers/update.js';
import checkAuth from './middleware/index.js';

const router = express.Router();

router.post('/auth', auth);
router.use(checkAuth);
router.post('/record/create', createRecord);
router.post('/record/update/:id', updateRecord);
router.post('/record/delete/:id', deleteRecord);
router.get('/record/:id', getOneRecord);
router.get('/records', getAllRecords);

export default router;