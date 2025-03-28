import { Request } from "express";
// import { JwtPayload } from "jsonwebtoken";

export interface AuthAttributes {
    username: string;
    password: string;
}

export interface AuthRequest extends Request {
    body: AuthAttributes;
}