import mongoose,{ Schema } from 'mongoose';
import logging from '../config/logging';
import IPlayer from '../interfaces/player';
var uniqueValidator = require('mongoose-unique-validator');
import crypto from 'crypto';

const PlayerSchema: Schema = new Schema(
    {
        userID: {type: String, lowercase: true, required: [true, "can't be blank"]},
        score: {type: Number, required: [true, "can't be blank"]},
        cards: [{type: Number}]
    }
);

PlayerSchema.plugin(uniqueValidator, {message: 'is already taken.'});

PlayerSchema.pre<IPlayer>('save', function () {
    logging.info('Mongo', 'Player details set', this);
})

export default mongoose.model<IPlayer>('Player', PlayerSchema);