import {Document} from 'mongoose';

export default interface IGame extends Document{
    username: string;
    password: string;
    salt: string;
    hash: string;
    email: string;
    score: number;
}