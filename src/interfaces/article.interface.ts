import { Request } from "express";

export interface ArticleAttributes {
  id: number;
  title: string;
  body: string;
  image_url: string;
  date: Date;
  author: string;
}

export interface ArticleRequest extends Request{
  body: ArticleAttributes;
}