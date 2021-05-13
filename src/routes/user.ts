import express from 'express';
import controller from '../controllers/game';

const router = express.Router();

router.post('/register', controller.register);
router.get('/get/all', controller.getAllGames);

export = router;