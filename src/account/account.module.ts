import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './entity/account.entity';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity, UserEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
  ],
  controllers: [AccountController],
  providers: [AccountService, UserService],
  exports: [AccountService],
})
export class AccountModule {}
