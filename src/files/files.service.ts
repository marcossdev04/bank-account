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

  async salvarDados(file: Express.MulterS3.File, paymentId: string) {
    const payment = await this.paymentRepository.findOne({
      where: { id: paymentId },
    });
    if (!payment) {
      throw new NotFoundException(
        `Pagamento com ID ${paymentId} não encontrado`,
      );
    }

    const arquivo = new File();
    arquivo.fileName = file.key;
    arquivo.contentLength = file.size;
    arquivo.contentType = file.mimetype;
    arquivo.url = file.location;
    arquivo.payment = payment;

    return await this.fotoRepository.save(arquivo);
  }
}
