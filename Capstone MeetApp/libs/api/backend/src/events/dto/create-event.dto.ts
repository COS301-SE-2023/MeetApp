import mongoose from "mongoose";

export class CreateEventDto {
   
    readonly ID!:mongoose.Schema.Types.ObjectId;

    readonly name!: string;
    
    readonly organisation!: string;
    
    readonly description!: string;

    readonly date!: string;
   
    readonly startTime!: string;
 
    readonly endTime!: string;
   
    readonly category!: string; 

    readonly region!: string;

}

