import mongoose,{ Schema } from 'mongoose';
import logging from '../config/logging';
import IGame from '../interfaces/game';
var uniqueValidator = require('mongoose-unique-validator');

const GameSchema: Schema = new Schema(
    {
        roomStatus: {type: Number, required: [true, "can't be blank"], match: [[0-3], 'is invalid']},
        privateRoom: {type: Boolean, required: [true, "can't be blank"]},
        players: [{
            userID: {type: String, lowercase: true, required: [true, "can't be blank"]},
            score: {type: Number, required: [true, "can't be blank"]},
            cards: [{type: Number}]
        }],
        unusedCards: [{type: Number, required: [true, "can't be blank"]}],
        storytellerID: {type: String, required: [true, "can't be blank"], lowercase: true}
    },
    {
        timestamps: true
    }
);

GameSchema.plugin(uniqueValidator, {message: 'is already taken.'});

GameSchema.pre<IGame>('save', function () {
    logging.info('Mongo', 'Game details set', this);
})

export default mongoose.model<IGame>('Game', GameSchema);

