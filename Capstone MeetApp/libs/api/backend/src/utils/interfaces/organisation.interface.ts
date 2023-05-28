/* eslint-disable prettier/prettier */
import { IEvents } from "./events.interface";

export interface IOrganisation {
    ID : string;
    username: string;
    password: string;
    name: string;
    events: IEvents;
}