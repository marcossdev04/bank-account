import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'payment',
})
export class PaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: number;

  @Column()
  date: string;

  @Column()
  description: string;
}
