import { literal, Op } from "sequelize";
import { ArticleAttributes, ArticleUpdateAttributes } from "../../interfaces/article.interface";
import { ResponseAttributes, ResponseResultsArray, ResponseResultsOneObject } from "../../interfaces/response.interface";
import { ArticleModel, UserModel } from "../index";
import { CustomError } from "../../helpers/customError.helpers";


/**
 * Creates a new article
 */
export const createArticle = async ( article: ArticleAttributes ):Promise<ResponseAttributes> => {
  const newArticle = await ArticleModel.create( article );

  return {
    code: 201,
    message: `New Article created successfully with id ${newArticle.id}.` };
};

/**
 * Returns all articles
 */
export const getArticles = async (
  order:string = "ASC",
  offset:string|number = 1,
  search:string = "",
): Promise<ResponseResultsArray<ArticleModel>> => {

  const where = {
    [Op.and]: [
      { down: false },
      {
        [Op.or]: [
          { title: { [Op.iLike]: `%${search}%` } },
          { "$author.name$": { [Op.iLike]: `%${search}%` } },
        ]
      }
    ]
  };

  const articles = await ArticleModel.findAll( {
    attributes: [
      "id",
      "title",
      [literal( "SUBSTRING(body, 1, 100)" ), "body"],
      "image_url",
      "date",
    ],
    where,
    order:[["id", order]],
    limit: 20,
    offset: 20 * ( Number( offset ) - 1 ),
    include: [
      {
        model: UserModel,
        as: "author",
        attributes: {
          exclude: [
            "username",
            "password",
            "createdAt",
            "updatedAt",
          ]
        },
      } ],
  } );

  return {
    results: articles,
    code: 200
  };
};

/**
 * Returns article by id
 */
export const getArticleById = async ( id: number ): Promise<ResponseResultsOneObject<ArticleModel>> => {
  const article = await ArticleModel.findByPk( id, {
    attributes: [
      "id",
      "title",
      "body",
      "image_url",
      "date",
      "down",
    ],
    include: [
      {
        model: UserModel,
        as: "author",
        attributes: {
          exclude: [
            "username",
            "password",
            "createdAt",
            "updatedAt",
          ]
        },
      } ]
  } );

  if ( !article || article.down ) throw new CustomError( "There is no Article registered with that id.", 404 );

  return {
    results: article,
    code: 200
  };

};

/**
 * Updates article by id
 */
export const updateArticle =
async ( id: number, updatedValues : ArticleUpdateAttributes ): Promise<ResponseAttributes> => {
  const [updatedCount] = await ArticleModel.update( ( updatedValues ), { where: { id, down: false } } );

  if ( !updatedCount ) throw new CustomError( "There is no Article registered with that id.", 404 );

  return {
    message: "Article updated successfully.",
    code: 200
  };
};

