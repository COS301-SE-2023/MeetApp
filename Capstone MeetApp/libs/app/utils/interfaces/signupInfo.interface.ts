export interface ISignupInfo {
    username : string;
    userType : "User" | "Organisation";
    name : string;
    surname : string;
    password : string; //subject to change
    repeatPassword : string;
}