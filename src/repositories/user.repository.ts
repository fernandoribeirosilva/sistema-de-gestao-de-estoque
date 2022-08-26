import { UserProps } from '../services/user/create.user.service';

class UserRepository {
   users: UserProps[] = []

   findByUsername(username: string) {
      const userExists = this.users.find(user => user.username === username);
      return userExists;
   }

   save(user: UserProps) {
      const id = Math.random().toString();
      user.id = id;
      const userWithId = {
         ...user
      }
      this.users.push(userWithId);
      return userWithId;
   }

}

export default new UserRepository 