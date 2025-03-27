// import { CustomError } from "../../helpers/customError.helpers";
import { UserAttributes } from "../../interfaces/user.interface";
import { ResponseAttributes, ResponseResultsOneObject } from "../../interfaces/response.interface";
import { UserModel } from "../index";



/**
 * Creates a new user
 */
export const createUser = async ( user: UserAttributes ):Promise<ResponseAttributes> => {
  await UserModel.create( user );
  return {
    code: 200,
    message: "New User registered successfully." };
};



/**
 * Returns employee by username
 */
export const getUserByUsername = async ( username: string ): Promise<ResponseResultsOneObject<UserModel | null> > => {

  const employee = await UserModel.findOne( { where: { username } } );

  return {
    results: employee,
    code: 200
  };
};

