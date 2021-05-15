import {Document} from 'mongoose';

export default interface IPlayer extends Document{
    userID: string;
    score: number;
    cards: number[]; 
}