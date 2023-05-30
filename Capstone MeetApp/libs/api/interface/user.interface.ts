import {Document} from 'mongoose'

export interface IUser extends Document{
    readonly iD: string;
    readonly Following : { id: string, name: string }[];
    readonly Followers : { id: string, name: string }[];
    readonly name: string;
}