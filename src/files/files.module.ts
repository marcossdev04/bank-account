import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entity/file.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { UserService } from 'src/user/user.service';
import { PaymentEntity } from 'src/payment/entity/payment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([File, UserEntity, PaymentEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
  ],
  controllers: [FilesController],
  providers: [FilesService, UserService],
  exports: [FilesService],
})
export class FilesModule {}
