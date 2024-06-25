import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'Valor',
    example: 100,
  })
  value: number;

  @ApiProperty({
    description: 'Data',
    example: '02-10-2024',
  })
  date: string;

  @ApiProperty({
    description: 'Descrição',
    example: 'Pagamento vale refeição',
  })
  description: string;
}
