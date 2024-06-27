import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/entity/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;

    try {
      const token = (authorization ?? '').split(' ')[1];
      const data = this.authService.checkToken(token);

      request.tokenPayload = data;

      const user: UserEntity = await this.userService.findOne(data.id);

      if (!user) {
        return false; // Se o usuário não for encontrado
      }

      // Defina a propriedade user no request para acessar no controlador posteriormente
      request.user = user;

      return true; // Permita o acesso se todas as condições forem atendidas
    } catch (error) {
      return false; // Em caso de erro, negue o acesso
    }
  }
}
