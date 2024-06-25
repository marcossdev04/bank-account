import { Module } from '@nestjs/common';
import { AccountEntity } from './entity/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity, AccountEntity])],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
