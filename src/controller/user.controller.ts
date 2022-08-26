import { Request, Response } from 'express';
import { CreateUseService } from '../services/user/create.user.service';

class UserController {

   handle(req: Request, res: Response) {
      const { body } = req;

      // Chamar a camada de serviços
      try {
         const createUserService = new CreateUseService();
         const result = createUserService.execute(body);
         res.status(201).json({ data: result });
         return
      } catch (err: any) {
         res.status(400).json({ error: err.message });
         return;
      }
   }

}

export { UserController }