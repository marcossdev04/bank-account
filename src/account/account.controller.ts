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
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  async create(@Body() { account_type, balance, name }: CreateAccountDto) {
    return await this.accountService.create({ account_type, balance, name });
  }

  @Get()
  async findUsers() {
    return await this.accountService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'string' })
  async read(@Param('id') id: string) {
    return await this.accountService.findOne(id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: 'string' })
  async update(@Param('id') id: string, @Body() data: UpdateAccountDto) {
    return await this.accountService.update(id, data);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string' })
  async delete(@Param('id') id: string) {
    return await this.accountService.delete(id);
  }
}
