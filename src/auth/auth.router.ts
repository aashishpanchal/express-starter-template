import passport from "passport";
import { Router } from "express";
import { Strategies } from "./enum";
import { LocalStrategy } from "./strategies";
import { authController } from "./auth.controller";

// initialize passport strategies
passport.use(Strategies.LOCAL, LocalStrategy);

const authRouter: Router = Router();
// add auth controllers to router
authRouter.route("/login").post(authController.login);
authRouter.route("/register").post(authController.register);

export default authRouter;
