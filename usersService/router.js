import express from 'express';
import multer from 'multer';
import authUser from './controllers/auth.js';
import deleteUser from './controllers/delete.js';
import registerUser from './controllers/register.js';
import updateData from './controllers/update.js';
import checkAuth from './middleware/index.js';

const router = express.Router();
const upload = multer({dest: 'uploads'});

router.post('/user/register', upload.single('userImg'), registerUser);
router.post('/user/auth', upload.single('userImg'), authUser);
router.post('/user/update/:id', checkAuth, upload.single('userImg'), updateData);
router.post('/user/delete/:id', checkAuth, upload.single('userImg'), deleteUser);

export default router;