import {Router} from 'express';
import authRoutes from './auth/auth.routes';

const appRoutes = (): Router => Router().use('api/v1/auth', authRoutes);

export default appRoutes;
