import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Game from '../models/game';

const NAMESPACE = 'Games';

const addGame = (req: Request, res: Response, next: NextFunction) => {
    let { roomStatus, privateRoom, players, unusedCards, storytellerID, story, storytellerCard, winner } = req.body;

    const game = new Game({
        _id: new mongoose.Types.ObjectId(),
        roomStatus, 
        privateRoom, 
        players, 
        unusedCards, 
        storytellerID,
        story,
        storytellerCard,
        winner
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
    let { userID, score, cards, playedCard, votedCard, _id } = req.body;

    const player = {
        userID: userID,
        score: score,
        cards: cards,
        playedCard,
        votedCard
    };
    
    let idVar = Game.findByIdAndUpdate(_id,{$push: {players: player}}, { new: true }, function(err, result){
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

const updateGame = (req: Request, res: Response, next: NextFunction) => {
    let { roomStatus, privateRoom, players, unusedCards, storytellerID, story, storytellerCard, winner, _id } = req.body;

    const game = new Game({
        _id,
        roomStatus, 
        privateRoom, 
        players, 
        unusedCards, 
        storytellerID,
        story,
        storytellerCard,
        winner
    });

    let idVar = Game.findByIdAndUpdate(_id,{$set: {_id: _id, roomStatus: roomStatus, privateRoom: privateRoom, players: players, unusedCards: unusedCards, storytellerID: storytellerID, story: story, storytellerCard: storytellerCard, winner: winner}}, { new: true }, function(err, result){
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

const joinPublic = (req: Request, res: Response, next: NextFunction) => {
    let { userID, score, cards, playedCard, votedCard } = req.body;

    const player = {
        userID: userID,
        score: score,
        cards: cards,
        playedCard,
        votedCard
    };

    Game.countDocuments({privateRoom: false, roomStatus: { $in: [0, 1] },  "players.3": { "$exists": false}}, function(err, count){
        if(count!=1)
        {
            return res.status(500).json({
                message: "err",
                err
            });
        }
        else
        {
            let game = Game.findOneAndUpdate({privateRoom: false},{$push: {players: player}}, { new: true }, function(err, result){
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
            console.log(game);
        }
    });
};

export default { addGame, addPlayerToGame, getGame, updateGame, joinPublic };