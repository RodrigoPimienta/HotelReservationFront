import { IUserBusiness } from "./IUserBusiness"

export interface IUser{
    userId: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: "USER" | "OWNER"
    business? : IUserBusiness | null
    userBusiness?: IUserBusiness | null
}