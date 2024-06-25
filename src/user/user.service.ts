import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async isValidId(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException(
        `O usuário ${id} não existe.`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create({ email, username, password }: CreateUserDto) {
    if (
      await this.usersRepository.exists({
        where: {
          email,
        },
      })
    ) {
      throw new HttpException(
        'Este email já está sendo utilizado.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = this.usersRepository.create({
      email,
      username,
      password,
    });
    return this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOneBy({
      id,
    });
  }

  async update(id: number, { email, password }: UpdateUserDto) {
    await this.isValidId(id);
    await this.usersRepository.update(id, {
      email,
      id,
      password,
    });
    return this.findOne(id);
  }

  async delete(id: number) {
    await this.isValidId(id);
    await this.usersRepository.delete(id);
    return true;
  }
}
