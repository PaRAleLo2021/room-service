import express from 'express';
import controller from '../controllers/game';

const router = express.Router();

router.post('/add/game', controller.addGame);
router.post('/add/player', controller.addPlayerToGame);
router.get('/get/game', controller.getGame);

export = router;