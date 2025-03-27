import bcrypt from "bcrypt";
import { Response } from "express";

import {  UserAttributes, UserRequest } from "../interfaces/user.interface";
import { UserMethods } from "../models/methods";
import { CustomError } from "../helpers/customError.helpers";

// import { CustomError } from "../helpers/customError.helpers";



export const postUser = async ( req: UserRequest, res: Response ): Promise<void> => {
  const { username, password } = req.body;

  const userExists = await UserMethods.getUserByUsername( username );
  if ( userExists.results ){
    throw new CustomError( "That username is already taken.", 400 );}

  const salt = bcrypt.genSaltSync();
  const hashedPassword = await bcrypt.hash( password, salt );

  const userInformation: UserAttributes = { ...req.body, password: hashedPassword };

  const { message, code }  =  await UserMethods.createUser( userInformation );
  res.status( code ).json( { message } );
};
