import { Request, Response } from "express";
import {
  ArticleAttributes,
  ArticlePaginationRequest,
  ArticleRequest,
  ArticleUpdateAttributes,
  ArticleUpdateRequest
} from "../interfaces/article.interface";
import { ArticleMethods, UserMethods } from "../models/methods";


export const postArticle = async ( req: ArticleRequest, res: Response ): Promise<void> => {
  const { title, body, image_url } = req.body;
  const username = req.user as string;

  const { results } = await UserMethods.getUserByUsername( username );
  const newArticle: ArticleAttributes = { title, body, image_url, user_id: results!.id };

  const { message, code }  =  await ArticleMethods.createArticle( newArticle );

  res.status( code ).json( { message } );
};

export const getArticles = async ( req: ArticlePaginationRequest, res: Response ): Promise<void> => {
  const { order, page, search } = req.query;

  const { results, code } = await ArticleMethods.getArticles( order, page, search );

  res.status( code ).json( results );
};

export const getArticleById = async ( req: ArticleRequest, res: Response ): Promise<void> => {
  const id = Number( req.params.id );

  const { results, code } = await ArticleMethods.getArticleById( id );

  res.status( code ).json( results );
};

export const updateArticle = async ( req: ArticleUpdateRequest, res: Response ): Promise<void> => {
  const id = Number( req.params.id );
  const { title, body, image_url } = req.body;
  const updatedValues: ArticleUpdateAttributes = { title, body, image_url };

  const { message, code } = await ArticleMethods.updateArticle( id, updatedValues  );

  res.status( code ).json( { message } );
};

export const deleteArticle = async ( req: Request, res: Response ): Promise<void> => {
  const id = Number( req.params.id );

  const { code } = await ArticleMethods.updateArticle( id, { down: true } );

  res.status( code ).json( { message: `Article with id ${id} deleted successfully.` } );
};

