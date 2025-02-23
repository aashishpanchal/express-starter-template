import {Router} from 'express';
import authRoutes from './auth/auth.routes';

const apiRoutes = (): Router => Router().use('/auth', authRoutes);

export default apiRoutes;
