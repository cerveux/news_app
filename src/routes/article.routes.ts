import { Router } from "express";
import { ArticleController } from "../controllers";
import { articleValidator } from "../validators";
import { asyncHandler } from "../middlewares/handlers.middleware";
import { checkAuth } from "../middlewares";


const router = Router();

router.post( "/", articleValidator.postArticle, checkAuth, asyncHandler( ArticleController.postArticle ) );
router.get( "/", articleValidator.getAllArticles, asyncHandler( ArticleController.getArticles ) );
router.get( "/:id", articleValidator.ArticleById, asyncHandler( ArticleController.getArticleById ) );
router.put( "/:id", articleValidator.updateArticle, checkAuth, asyncHandler( ArticleController.updateArticle ) );
router.delete( "/:id", articleValidator.ArticleById, checkAuth, asyncHandler( ArticleController.deleteArticle ) );

export default router;

