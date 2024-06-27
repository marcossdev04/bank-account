import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { PaymentModule } from './payment/payment.module';
import { UserEntity } from './user/entity/user.entity';
import { AccountEntity } from './account/entity/account.entity';
import { PaymentEntity } from './payment/entity/payment.entity';
import { FilesModule } from './files/files.module';
import { File } from './files/entity/file.entity';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '010203',
      database: 'postgres',
      entities: [UserEntity, AccountEntity, PaymentEntity, File],
      synchronize: true,
    }),
    FilesModule,
    UserModule,
    AuthModule,
    AccountModule,
    PaymentModule,
  ],
})
export class AppModule {}
