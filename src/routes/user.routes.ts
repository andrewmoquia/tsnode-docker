import { Router } from 'express';
import { UserController } from '../controller/user.controller';

export class UserRoutes {
   private static cntrl = new UserController();
   private static router = Router();

   public static create() {
      this.router.post('/signup', this.cntrl.signUp);

      this.router.post('/signin', this.cntrl.signIn);

      this.router.post('/logout', this.cntrl.logoutUser);

      return this.router;
   }
}
