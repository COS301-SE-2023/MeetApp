//import { Request } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Request } from '@nestjs/common';
import mongoose from "mongoose";
import { Friendship } from "./friendships/schema";
import { User } from "./users/schema";
import { Event } from "./events/schema";

export interface AuthenticatedRequest extends Request {
    //@ApiProperty({description: "The user's credentials", example: {id: "747223dedd65fc64879e13dc", username: "TimothyJones24", password: "pass435"}})
     user: {id : string, username : string, password: string};
  }

export class UserAccountInfo {
  @ApiProperty({example: "747223dedd65fc64879e13dc", description : "The user's unique ID.", type: "string"})
     readonly id! : string;
     @ApiProperty({example: "user_man23", description : "The user's desired username."})
     readonly username! : string;
     @ApiProperty({example: "password101", description : "The user's chosen password."})
     readonly password! : string;
     @ApiProperty({example: 1516239022, description : "A number showing when the access was granted."})
     readonly iat! : number;
     @ApiProperty({example: 1516245960, description : "A number showing when the access will be expired."})
     readonly exp!: number;
  }

  export class OrganisationAccountInfo {
    @ApiProperty({example: "64723154d01ba2f73db88fe0", description : "The organisation's unique ID.", type: "string"})
       readonly id! : string;
       @ApiProperty({example: "techTuks", description : "The organisation's desired username."})
       readonly username! : string;
       @ApiProperty({example: "thetitans", description : "The organisation's chosen password."})
       readonly password! : string;
       @ApiProperty({example: 1516239022, description : "A number showing when the access was granted."})
       readonly iat! : number;
       @ApiProperty({example: 1516245960, description : "A number showing when the access will be expired."})
       readonly exp!: number;
    }

export class UserLoginRequest {

    @ApiProperty({description : 'An existing username.', example: 'john_doe'})
     readonly username! : string;

    @ApiProperty({description : 'The password associated with username.', example: 'pass123'})
    readonly password! : string;
  }

  export class OrganisationLoginRequest {

    @ApiProperty({description : 'An existing username.', example: 'techTuks'})
     readonly username! : string;

    @ApiProperty({description : 'The password associated with username.', example: 'thetitans'})
    readonly password! : string;
  }

  export class OrganisationLoginResponse {
    @ApiProperty({description : 'An access token (JWT bearer token) that also stores the organisation\'s session information.', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzIyM2Y4Y2Q2NWZjNjY4NzllM2YxZiIsInVzZXJuYW1lIjoiam9obl9kb2UiLCJwYXNzd29yZCI6InBhc3MxMjMiLCJpYXQiOjE2OTI0ODEzNjUsImV4cCI6MTY5MjU2Nzc2NX0.W576UcvKr21DPGEEZKLsluVxxADiAeg5gJoiwoQc1v8'})
    readonly access_token! : string;

    @ApiProperty({description : 'A message stating the success or failure of the login', example: 'Login successful'})
    readonly message! : string;
  }

  export class UserLoginResponse {
    @ApiProperty({description : 'An access token (JWT bearer token) that also stores the user\'s session information.', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzIyM2Y4Y2Q2NWZjNjY4NzllM2YxZiIsInVzZXJuYW1lIjoiam9obl9kb2UiLCJwYXNzd29yZCI6InBhc3MxMjMiLCJpYXQiOjE2OTI0ODEzNjUsImV4cCI6MTY5MjU2Nzc2NX0.W576UcvKr21DPGEEZKLsluVxxADiAeg5gJoiwoQc1v8'})
    readonly access_token! : string;

    @ApiProperty({description : 'A message stating the success or failure of the login', example: 'Login successful'})
    readonly message! : string;
  }

  export class UserFriends {

    @ApiProperty({example: "747223dedd65fc64879e13dc", description : "The user's desired username.", type: "string"})
    readonly ID!: mongoose.Schema.Types.ObjectId;

    @ApiProperty({description : 'An existing username.', example: 'john_doe'})
    readonly username! : string;

    @ApiProperty({example: "em=e?vftb+asi...", description : "Base64/BSON representation of profile picture."})
    readonly profilePicture!: string;
  }

  export class UnfriendBody {
    @ApiProperty({example : {friend : "647223dedd65fc64879e13dc"}, description: "The ID of the friend a logged-in user wants to remove", type: "OrderedMap"})
    readonly friendID! : {friend : string}
  }

  export class UnfriendResponse {
    @ApiProperty({description : 'An existing friendship or null.', example: {_id: "6472234ecd65fc66879d2dbf", requester: "647223decd65fc66879e13dc", requestee: "647223f8cd65fc66879e3f1f", status: true}, type: "OrderedMap"})
    readonly friendship!: Friendship|null
    @ApiProperty({description : 'An message indicated the success/failure of unfriending', example: 'Friend removed successfully!'})
    readonly message! : string
    @ApiProperty({description : 'Whether changes were made to the friendship entry in the database', example: true})
    readonly changes! : boolean
  }

  export class InterestCategoryResponse {
    @ApiProperty({description: 'The most frequent category in the user\'s attendance list', example: {Technology: 7}, type: 'OrderedMap'})
    readonly category1st! : {category: string, frequency: number}
    @ApiProperty({description: 'The second most frequent category in the user\'s attendance list', example: {Education: 4}, type: 'OrderedMap'})
    readonly category2nd! : {category: string, frequency: number}
    @ApiProperty({description: 'The thrid most frequent category in the user\'s attendance list', example: {Festival: 2}, type: 'OrderedMap'})
    readonly category3rd! : {category: string, frequency: number}
  }

  export class InterestRegionResponse {
    @ApiProperty({description: 'The most frequent region in the user\'s attendance list', example: {Pretoria: 13}, type: 'OrderedMap'})
    readonly region1st! : {region: string, frequency: number}
    @ApiProperty({description: 'The second most frequent region in the user\'s attendance list', example: {Joburg: 5}, type: 'OrderedMap'})
    readonly region2nd! : {region: string, frequency: number}
    @ApiProperty({description: 'The thrid most frequent region in the user\'s attendance list', example: {Nelspruit: 1}, type: 'OrderedMap'})
    readonly region3rd! : {region: string, frequency: number}
  }

  export class SupporterAndTopEvent {
    @ApiProperty({description: 'The user\'s information', type: User})
    readonly supporter!: User

    @ApiProperty({description: 'The user\'s top attended event', type: Event})
    readonly topEvent!: Event
  }
  export class CategoryCountResponse {
    @ApiProperty({description: 'Key-value pair of a category and the frequency of its use in the organisation', example: {Technology: 7}, type: 'OrderedMap'})
    readonly category! : {category: string, frequency: number}
  }

  export class RegionCountResponse {
    @ApiProperty({description: 'Key-value pair of a region and the frequency of its use in the organisation', example: {Pretoria: 13}, type: 'OrderedMap'})
    readonly region! : {region: string, frequency: number}
  }

  export class TopRegion {
    @ApiProperty({description: 'The most popular region', type: 'string', example: 'Pretoria'})
    readonly region!: string
  }

  export class TopCategory {
    @ApiProperty({description: 'The most popular category', type: 'string', example: 'Technology'})
    readonly category!: string
  }

  export class UpdateEventResponse {
    @ApiProperty({description: 'A message indicating if it was a success or not', type: 'string', example: 'Event has been successfully updated'})
    readonly message! : string;

    @ApiProperty({description: 'The id of the user', type: 'string', example: '74723154801ba2f73db88fe0'})
    readonly event! : Event;
  }

  export class NewEventResponse {
    @ApiProperty({description: 'A message indicating if it was a success or not', type: 'string', example: 'Event has been created successfully'})
    readonly message! : string;

    @ApiProperty({description: 'The id of the user', type: 'string', example: '74723154801ba2f73db88fe0'})
    readonly event! : Event;
  }

  export class UserAttendEventResponse {
    @ApiProperty({description: 'The id of the event', type: 'string', example: '64723154d01ba2f73db88fe0'})
    readonly eventID! : string

    @ApiProperty({description: 'The id of the user', type: 'string', example: '74723154d01ba2f73db88fe0'})
    readonly userID! : string

    @ApiProperty({description: 'Indicating whether the user is attending an event or not', type: 'bollean', example: 'false'})
    readonly isAttending! : boolean
  }

  export class UserAttendEventBody {
    @ApiProperty({description: 'The id of the event', type: 'string', example: '64723154d01ba2f73db88fe0'})
    readonly eventID! : string
  }

  export class RequesterBody {
    @ApiProperty({description: 'The id of the requester', type: 'string', example: '64723154d01ba2f73db88fe0'})
    readonly requester! : string
  }

