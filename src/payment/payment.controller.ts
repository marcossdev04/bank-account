import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('payment')
@Controller('payment')
@UseGuards(AuthGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post(':accountId')
  @ApiParam({ name: 'accountId', type: 'string' })
  async create(
    @Param('accountId') accountId: string,
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    return await this.paymentService.create(accountId, createPaymentDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  async findUsers() {
    return await this.paymentService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiParam({ name: 'id', type: 'string' })
  async read(@Param('id') id: string) {
    return await this.paymentService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('report/:accountId')
  @ApiParam({ name: 'accountId', type: 'string' })
  async report(
    @Param('accountId') accountId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    return await this.paymentService.getReport(accountId, start, end);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put(':id')
  @ApiParam({ name: 'id', type: 'string' })
  async update(@Param('id') id: string, @Body() data: UpdatePaymentDto) {
    return await this.paymentService.update(id, data);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string' })
  async delete(@Param('id') id: string) {
    return await this.paymentService.delete(id);
  }
}
