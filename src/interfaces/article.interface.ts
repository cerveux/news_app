import { Request } from "express";

export interface ArticleAttributes {
  id?: number;
  title: string;
  body: string;
  image_url?: string;
  date?: Date;
  user_id: string;
  author?: object;
  down?: boolean;
}

export interface ArticleUpdateAttributes {
  title?: string;
  body?: string;
  image_url?: string;
  down?: boolean;
}

export interface ArticleRequest extends Request{
  body: ArticleAttributes;
  user?: string;
}

export interface ArticlePaginationRequest extends Request{
  query:{
    page?:string
    search?:string
    order?:string
  }
}

export interface ArticleUpdateRequest extends Request{
  params: { id: string };
  body: ArticleUpdateAttributes;
}