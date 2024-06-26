import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class UpdatePaymentDto {
  @ApiProperty({
    description: 'Valor',
    example: 100,
  })
  @IsNumber()
  value: number;

  @ApiProperty({
    description: 'Data',
    example: '2024-02-10T00:00:00.000Z',
  })
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty({
    description: 'Descrição',
    example: 'Pagamento vale refeição',
  })
  @IsString()
  description: string;
}
