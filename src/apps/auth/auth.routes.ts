import {Router} from 'express';
import {proxyWrapper} from 'exutile';
import {AuthController} from './auth.controller';
import {validate} from '@/middleware/validate-req';
import {LoginDto} from './auth.dto';

const authRoutes = (): Router => {
  // Router
  const router = Router();
  // Create AuthController Instance
  const auth = proxyWrapper(AuthController);
  // Config Router with handler
  router.route('/login').post(validate.body(LoginDto), auth.login);
  router.route('/register').post(auth.register);
  router.route('/logout').post(auth.logout);
  router.route('/refresh').post(auth.refresh);
  return router;
};

export default authRoutes;
