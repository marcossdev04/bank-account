import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccountDto {
  @ApiProperty({
    description: 'Nome do proprietário',
    example: 'Marcos Vinícius',
  })
  name: string;

  @ApiProperty({
    description: 'tipo de conta',
    example: 'Corrente | Poupança',
  })
  account_type: string;

  @ApiProperty({
    description: 'Saldo inicial',
    example: 200,
  })
  balance: number;
}
