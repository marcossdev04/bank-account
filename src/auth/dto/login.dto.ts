import { ApiProperty } from '@nestjs/swagger';

export class loginDto {
  @ApiProperty({
    description: 'email do usuário',
    example: 'exemple@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'senha do usuário',
    example: '123@abc',
  })
  password: string;
}
