import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    return await this.userService.create(data);
  }

  @Get()
  async findUsers() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number' })
  async read(@Param('id') id: number) {
    return await this.userService.findOne(id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: 'number' })
  async update(@Param('id') id: number, @Body() data: UpdateUserDto) {
    return await this.userService.update(id, data);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'number' })
  async delete(@Param('id') id: number) {
    return await this.userService.delete(id);
  }
}
