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

const addPlayerToGame = (req: Request, res: Response, next: NextFunction) => {
    let { userID, score, cards, _id } = req.body;

    const player = {
        userID: userID,
        score: score,
        cards: cards,
    };
    
    let idVar = Game.findByIdAndUpdate(_id,{$push: {players: player}}, function(err, result){
        if(err){
            return res.status(500).json({
                message: err.message,
                err
            });
        }
        else{
            return res.status(201).json({
                game: result
            });
        }
    });
    console.log(idVar);
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

export default { addGame, addPlayerToGame, getGame };