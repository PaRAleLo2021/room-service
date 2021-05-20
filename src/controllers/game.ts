import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import logging from '../config/logging';
import Game from '../models/game';
import crypto from 'crypto';
import Player from '../models/player';
import game from '../models/game';
import IPlayer from '../interfaces/player';

const NAMESPACE = 'Games';

const addGame = (req: Request, res: Response, next: NextFunction) => {
    let { roomStatus, privateRoom, players, unusedCards, storytellerID } = req.body;

    const game = new Game({
        _id: new mongoose.Types.ObjectId(),
        roomStatus, 
        privateRoom, 
        players, 
        unusedCards, 
        storytellerID
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

const getGame = (req: Request, res: Response, next: NextFunction) => {
    let { _id } = req.body;

    Game.findById(_id).exec().then((game) => {
        return res.status(200).json({
            games: game
        });
    })
    .catch((error) => {
        return res.status(500).json({
            message: error.message,
            error
        });
    });
};

const addPlayerToGame = (req: Request, res: Response, next: NextFunction) => {
    let { userID, score, cards, _id } = req.body;

    mongoose.set('useFindAndModify', false);

    const player = new Player({
        userID,
        score,
        cards,
    });

    //console.log(player);

    let game = Game.findOneAndUpdate({_id: _id},{$push: {players: player}}).then((result) => {
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
    console.log(game);
};

export default { addGame, addPlayerToGame, getGame };