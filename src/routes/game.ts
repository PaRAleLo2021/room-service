import express from 'express';
import controller from '../controllers/game';

const router = express.Router();

router.post('/add/game', controller.addGame);
router.patch('/add/player', controller.addPlayer);

export = router;