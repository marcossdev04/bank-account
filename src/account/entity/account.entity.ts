import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
