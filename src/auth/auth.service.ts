import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { registerDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/entity/user.entity';

@Injectable()
export class AuthService {
  private issuer = 'login';
  private audience = 'users';

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  createToken(user: UserEntity) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          nome: user.username,
          email: user.email,
        },
        {
          expiresIn: '3 days',
          subject: String(user.id),
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: this.audience,
        issuer: this.issuer,
      });
      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  isvalidtionToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const user = await this.usersRepository.findOneBy({
      email,
      password,
    });

    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorretos');
    }
    return this.createToken(user);
  }

  async recuperacaoDeSenha(email: string) {
    const user = await this.usersRepository.findOneBy({
      email,
    });

    if (!user) {
      throw new UnauthorizedException('Email está incorreto ');
    }

    this.jwtService.sign(
      {
        id: user.id,
      },
      {
        expiresIn: '2 days',
        subject: String(user.id),
        issuer: 'recuperacaoDeSenha',
        audience: 'users',
      },
    );
    return true;
  }

  async reset(password: string, token: string) {
    try {
      const data: any = this.jwtService.verify(token, {
        issuer: 'recuperacaoDeSenha',
        audience: 'users',
      });

      if (isNaN(Number(data.id))) {
        throw new BadRequestException('Token inválido');
      }

      await this.usersRepository.update(Number(data.id), {
        password,
      });

      const user = await this.userService.findOne(Number(data.id));

      return await this.createToken(user);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async register(dados: registerDto) {
    const user = await this.userService.create(dados);
    console.log(user);
    return await this.createToken(user);
  }
}
