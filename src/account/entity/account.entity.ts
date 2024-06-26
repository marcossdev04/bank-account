import { PaymentEntity } from 'src/payment/entity/payment.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({
  name: 'account',
})
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  account_type: string;

  @Column()
  balance: number;

  @OneToMany(() => PaymentEntity, (payment) => payment.account)
  payments: PaymentEntity[];
}
