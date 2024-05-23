import express, { Router } from 'express';
import multer from 'multer';
import * as emailController from '../Controllers/checkEmail';

const upload = multer();
const router: Router = express.Router();

router.post("/upload_files", upload.single("file"), emailController.uploadFiles);

export default router;