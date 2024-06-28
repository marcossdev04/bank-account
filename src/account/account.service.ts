import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from './entity/account.entity';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  async isValidId(id: string) {
    const user = await this.accountRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException(
        `A conta com id ${id} não existe.`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create({ account_type, balance, name }: CreateAccountDto) {
    if (balance < 0) {
      throw new HttpException(
        'O saldo não pode ser menor que 0.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const id = uuidv4();
    const user = this.accountRepository.create({
      id,
      account_type,
      balance,
      name,
    });
    return this.accountRepository.save(user);
  }

  async findAll() {
    return await this.accountRepository.find();
  }

  async findOne(id: string) {
    return await this.accountRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, { account_type, balance, name }: UpdateAccountDto) {
    await this.isValidId(id);
    if (balance < 0) {
      throw new HttpException(
        'O saldo não pode ser menor que 0.',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.accountRepository.update(id, {
      account_type,
      balance,
      name,
    });
    return this.findOne(id);
  }

  async delete(id: string) {
    await this.isValidId(id);
    await this.accountRepository.delete(id);
    return true;
  }
}
