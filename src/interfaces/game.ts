import {Document} from 'mongoose';
import player from '../interfaces/player';

export default interface IGame extends Document{
    roomStatus: number;
    privateRoom: boolean;
    players: player[];
    unusedCards: number[];
    storytelledID: string;
}