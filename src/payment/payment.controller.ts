import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiParam({ name: 'accountId', type: 'string' })
  async create(
    @Param('accountId') accountId: string,
    @Body() { date, description, value }: CreatePaymentDto,
  ) {
    return await this.paymentService.create(accountId, {
      date,
      description,
      value,
    });
  }

  @Get()
  async findUsers() {
    return await this.paymentService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'string' })
  async read(@Param('id') id: string) {
    return await this.paymentService.findOne(id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: 'string' })
  async update(@Param('id') id: string, @Body() data: UpdatePaymentDto) {
    return await this.paymentService.update(id, data);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string' })
  async delete(@Param('id') id: string) {
    return await this.paymentService.delete(id);
  }
}
