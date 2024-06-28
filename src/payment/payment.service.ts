import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { PaymentEntity } from './entity/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { AccountEntity } from 'src/account/entity/account.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  async isValidId(id: string) {
    const user = await this.paymentRepository.findOne({
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

  async isValidIdAccount(id: string) {
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

  async create(
    accountId: string,
    { date, description, value }: CreatePaymentDto,
  ) {
    await this.isValidIdAccount(accountId);
    const account = await this.accountRepository.findOne({
      where: {
        id: accountId,
      },
    });

    if (account.balance < value) {
      throw new HttpException(`Saldo insuficiente.`, HttpStatus.BAD_REQUEST);
    }
    account.balance -= value;
    await this.accountRepository.save(account);

    const id = uuidv4();
    const payment = this.paymentRepository.create({
      id,
      date,
      description,
      value,
      account,
    });
    return this.paymentRepository.save(payment);
  }

  async findAll() {
    return await this.paymentRepository.find();
  }

  async getReport(accountId: string, startDate?: Date, endDate?: Date) {
    await this.isValidIdAccount(accountId);

    const whereCondition: any = { account: { id: accountId } };

    if (startDate && endDate) {
      whereCondition.date = Between(startDate, endDate);
    } else if (startDate) {
      whereCondition.date = Between(startDate, new Date());
    }

    return this.paymentRepository.find({
      where: whereCondition,
      relations: ['account'],
    });
  }

  async findOne(id: string) {
    return await this.paymentRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, { date, description, value }: UpdatePaymentDto) {
    await this.isValidId(id);
    const payment = await this.findOne(id);
    const account = payment.account;

    const difference = value - payment.value;

    if (account.balance < difference) {
      throw new HttpException(`Saldo insuficiente.`, HttpStatus.BAD_REQUEST);
    }

    account.balance -= difference;
    await this.accountRepository.save(account);

    await this.paymentRepository.update(id, {
      date,
      description,
      value,
    });
    return this.findOne(id);
  }

  async delete(id: string) {
    await this.isValidId(id);
    const payment = await this.findOne(id);
    const account = payment.account;

    account.balance += payment.value;
    await this.accountRepository.save(account);

    await this.paymentRepository.delete(id);
    return true;
  }
}
