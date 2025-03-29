import { ValidationChain, body, param, query } from "express-validator";
import { RequestHandler } from "express-serve-static-core";
import { validateErrors } from "../middlewares";


const title: ValidationChain = body( "title" ).isAlphanumeric( "es-ES", { ignore: " ,.():" } )
  .withMessage( "One of the special characters entered is not allowed. \nOnly /  , . ( ) and : are allowed." )
  .trim().isLength( { min: 1, max: 50 } ).withMessage( "The title must be between 1 and 50 characters." )
  .optional( { nullable: true } ).escape();
const body_attribute: ValidationChain = body( "body" ).isAlphanumeric( "es-ES", { ignore: " /-_,.():+*" } )
  .withMessage( "One of the special characters entered is not allowed. \nOnly / * + - _ , . () and : are allowed." ).trim()
  .optional( { nullable: true } ).escape();
const image_url: ValidationChain = body( "image_url" ).isURL().withMessage( "The image URL is not valid." ).trim()
  .optional( { nullable: true } );

export const postArticle: ValidationChain|RequestHandler[] = [
  title,
  body( "title" ).not().isEmpty().withMessage( "The title is required." ),
  body_attribute,
  body( "body" ).not().isEmpty().withMessage( "The body is required." ),
  image_url,
  validateErrors
];

export const getAllArticles: ValidationChain|RequestHandler[] = [
  query( "page" ).isInt().withMessage( "Page must be a number" ).optional( ),
  query( ["order"] ).toUpperCase().
    isIn( ["ASC", "DESC"] ).withMessage( "No valid value was provided for the search, use ASC or DESC" ).optional( ),
  validateErrors
];

export const ArticleById: ValidationChain|RequestHandler[] = [
  param( "id" ).isInt().withMessage( "The id value must be a number." )
    .not().isEmpty().withMessage( "The id is required." ),
  validateErrors
];

export const updateArticle: ValidationChain|RequestHandler[] = [
  title,
  body_attribute,
  image_url,
  validateErrors
];