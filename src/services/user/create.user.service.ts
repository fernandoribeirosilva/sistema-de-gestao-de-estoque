import UserRepository from "../../repositories/user.repository";

export interface UserProps {
   id: string;
   username: string;
   name: string;
}

class CreateUseService {

   execute(data: UserProps) {

      if (!data.username) {
         throw new Error('Username é obrigatório.');
      }
      if (!data.name) {
         throw new Error('name é obrigatório.');
      }

      // Chamar o repositório

      const existUser = UserRepository.findByUsername(data.username);
      if (existUser) {
         throw new Error('Username já existe.');
      }

      return UserRepository.save(data);
   }

}

export { CreateUseService }