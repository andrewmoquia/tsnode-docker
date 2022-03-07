import { RequestHandler } from 'express';
import User from '../model/user.model';
import bcrypt from 'bcryptjs';

export class UserController {
   public signUp: RequestHandler = async (req, res) => {
      try {
         const { username, password } = req.body;

         const user = await User.findOne({ username });
         if (user && user.username === username) {
            return res.json({ message: 'User already exist.' });
         }

         const hashPassword = await bcrypt.hash(password, 12);
         if (!hashPassword) return res.json({ message: 'Failed to create account.' });

         const newUser = await new User({ username, password: hashPassword });
         if (!newUser) return res.json({ message: 'Failed to create account.' });

         const saveUser = await newUser.save();
         return saveUser && hashPassword && newUser
            ? res.json({ message: 'Success creating account.' })
            : res.json({ message: 'Failed to create account.' });
      } catch (error) {
         return res.json({ error });
      }
   };

   public signIn: RequestHandler = async (req, res) => {
      try {
         const { username, password } = req.body;

         const user: any = await User.findOne({ username });
         if (!user) return res.json({ message: 'Incorrect password or username.' });

         const chechPassword = await bcrypt.compare(password, user.password);

         return chechPassword && user
            ? res.json({ message: 'Successfully login.' })
            : res.json({ message: 'Incorrect password or username.' });
      } catch (error) {
         return res.json({ error });
      }
   };
}