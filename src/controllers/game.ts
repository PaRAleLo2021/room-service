import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import logging from '../config/logging';
import Game from '../models/game';
import crypto from 'crypto';

const NAMESPACE = 'Games';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "Token validated, game authorized");

    return res.status(200).json({
        message: "Authorized"
    })
};

const register = (req: Request, res: Response, next: NextFunction) => {
    let { username, password, email } = req.body;

    const game = new Game({
        _id: new mongoose.Types.ObjectId(),
        username,
        password,
        email
    });

    return game
        .save()
        .then((result) => {
            console.log("here");
            return res.status(201).json({
                game: result
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getAllGames = (req: Request, res: Response, next: NextFunction) => {
    Game.find()
    .select('-password -hash -salt')
    .exec()
        .then((games) => {
            return res.status(200).json({
                games: games,
                count: games.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default { validateToken, register, getAllGames };