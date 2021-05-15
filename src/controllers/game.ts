import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import logging from '../config/logging';
import Game from '../models/game';
import crypto from 'crypto';
import Player from '../models/player';

const NAMESPACE = 'Games';

const addGame = (req: Request, res: Response, next: NextFunction) => {
    let { roomStatus, privateRoom, players, unusedCards, storytelledID } = req.body;

    const game = new Game({
        _id: new mongoose.Types.ObjectId(),
        roomStatus, 
        privateRoom, 
        players, 
        unusedCards, 
        storytelledID
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

const addPlayer = (req: Request, res: Response, next: NextFunction) => {
    let { userID, score, cards, gameID } = req.body;

    const player = new Player({
        _id: new mongoose.Types.ObjectId(),
        userID,
        score,
        cards,
    });
    
    let idVar = Game.findOneAndUpdate({_id: gameID},{$push: {"players": player}}).then((result) => {
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
    console.log(idVar);

    // return game
    //     .save()
        // .then((result) => {
        //     console.log("here");
        //     return res.status(201).json({
        //         game: result
        //     });
        // })
        // .catch((error) => {
        //     return res.status(500).json({
        //         message: error.message,
        //         error
        //     });
        // });
};

export default { addGame, addPlayer };