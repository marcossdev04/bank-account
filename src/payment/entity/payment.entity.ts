import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AccountEntity } from 'src/account/entity/account.entity';

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
}
