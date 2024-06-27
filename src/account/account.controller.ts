import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('account')
@Controller('account')
@UseGuards(AuthGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() { account_type, balance, name }: CreateAccountDto) {
    return await this.accountService.create({ account_type, balance, name });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  async findUsers() {
    return await this.accountService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiParam({ name: 'id', type: 'string' })
  async read(@Param('id') id: string) {
    return await this.accountService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put(':id')
  @ApiParam({ name: 'id', type: 'string' })
  async update(@Param('id') id: string, @Body() data: UpdateAccountDto) {
    return await this.accountService.update(id, data);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string' })
  async delete(@Param('id') id: string) {
    return await this.accountService.delete(id);
  }
}
