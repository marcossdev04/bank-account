import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entity/user.entity';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { AccountEntity } from './account/entity/account.entity';
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';
import { PaymentEntity } from './payment/entity/payment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '010203',
      database: 'postgres',
      entities: [UserEntity, AccountEntity, PaymentEntity],
      synchronize: true,
    }),
    AccountModule,
    UserModule,
    AuthModule,
    PaymentModule,
  ],
})
export class AppModule {}
