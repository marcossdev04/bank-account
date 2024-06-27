import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AccountEntity } from 'src/account/entity/account.entity';
import { File } from 'src/files/entity/file.entity';

@Entity('payments')
export class PaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  description: string;

  @Column('decimal')
  value: number;

  @ManyToOne(() => AccountEntity, (account) => account.payments)
  account: AccountEntity;

  @OneToMany(() => File, (file) => file.payment)
  files: File[];
}
