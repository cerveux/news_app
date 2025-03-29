import { Request } from "express";

export interface UserAttributes {
  username: string;
  name: string;
  lastname: string;
  dni: string;
  password: string;
}

export interface UserRequest extends Request{
  body: UserAttributes;
}