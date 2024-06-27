import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './entity/payment.entity';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { UserEntity } from '../user/entity/user.entity';
import { AuthGuard } from '../auth/auth.guard';
import { AccountEntity } from '../account/entity/account.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentEntity, UserEntity, AccountEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, AuthGuard],
  exports: [PaymentService],
})
export class PaymentModule {}
