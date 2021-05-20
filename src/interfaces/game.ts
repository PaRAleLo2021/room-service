import {Document} from 'mongoose';

export default interface IGame extends Document{
    roomStatus: number;
    privateRoom: boolean;
    players: {
        userID: string;
        score: number;
        cards: number[]; 
    }[];
    unusedCards: number[];
    storytellerID: string;
}