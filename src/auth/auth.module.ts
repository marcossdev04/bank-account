import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { UserEntity } from '../user/entity/user.entity';
import { AuthGuard } from './auth.guard';
import { AccountModule } from 'src/account/account.module';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'jwtSecret',
    }),
    forwardRef(() => UserModule),
    forwardRef(() => AccountModule),
    forwardRef(() => PaymentModule),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
