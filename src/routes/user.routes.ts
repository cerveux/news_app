import { Router } from "express";

import { UserController } from "../controllers";
import { userValidator } from "../validators";
import { asyncHandler } from "../middlewares/handlers.middleware";
// import { checkAuth, redisMiddlewares } from "../middlewares";




const router = Router();

router.post( "/", userValidator.postEmployee, asyncHandler( UserController.postUser ) );

// router.use( [redisMiddlewares.checkValidity, checkAuth] );

// router.delete( "/:id", employeeValidator.deleteEmployee, asyncHandler( EmployeeController.deleteEmployeeById ) );

export default router;

