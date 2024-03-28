import { Role } from "./Role";

export class User {
    userID!: number;
    userName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    confpassword!: string;
    role!:Role;
}