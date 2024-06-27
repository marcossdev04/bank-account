// entity/file.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { PaymentEntity } from 'src/payment/entity/payment.entity';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column()
  contentLength: number;

  @Column()
  contentType: string;

  @Column()
  url: string;

  @ManyToOne(() => PaymentEntity, (payment) => payment.files)
  payment: PaymentEntity;
}
