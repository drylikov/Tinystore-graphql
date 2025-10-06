import { User } from '../entities/user.entity';

export default interface Ctx {
  req: Request & { user?: Pick<User, 'email' | 'username'> };
  res: Response;
}
