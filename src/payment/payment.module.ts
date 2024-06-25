import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentEntity } from './entity/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './payment.controller';
import { AccountEntity } from 'src/account/entity/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity, AccountEntity])],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
