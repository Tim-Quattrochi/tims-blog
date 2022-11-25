import { Router } from 'express';
import blogsRouter from './blogs.routes';
import authRouter from './auth.routes';

const apiRouter = Router();

apiRouter.use('/blogs', blogsRouter);
apiRouter.use('/auth', authRouter);

export default apiRouter;
