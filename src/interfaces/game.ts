import {Document} from 'mongoose';

export default interface IGame extends Document{
    roomStatus: number;
    privateRoom: boolean;
    players: {
        userID: string;
        score: number;
        cards: number[]; 
        playedCard: string;
        votedCard: string;
    }[];
    unusedCards: number[];
    storytellerID: string;
    story: string;
    storytellerCard: string;
    winner: string[];
}