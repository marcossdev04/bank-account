import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entity/file.entity';
import { PaymentEntity } from 'src/payment/entity/payment.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private fotoRepository: Repository<File>,
    @InjectRepository(PaymentEntity)
    private paymentRepository: Repository<PaymentEntity>,
  ) {}

  async saveData(file: Express.MulterS3.File, paymentId: string) {
    const payment = await this.paymentRepository.findOne({
      where: { id: paymentId },
    });
    if (!payment) {
      throw new NotFoundException(
        `Pagamento com ID ${paymentId} não encontrado`,
      );
    }

    const newFile = new File();
    newFile.fileName = file.key;
    newFile.contentLength = file.size;
    newFile.contentType = file.mimetype;
    newFile.url = file.location;
    newFile.payment = payment;

    return await this.fotoRepository.save(newFile);
  }
}
