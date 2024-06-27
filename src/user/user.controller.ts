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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() data: CreateUserDto) {
    return await this.userService.create(data);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  async findUsers() {
    return await this.userService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiParam({ name: 'id', type: 'number' })
  async read(@Param('id') id: number) {
    return await this.userService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put(':id')
  @ApiParam({ name: 'id', type: 'number' })
  async update(@Param('id') id: number, @Body() data: UpdateUserDto) {
    return await this.userService.update(id, data);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiParam({ name: 'id', type: 'number' })
  async delete(@Param('id') id: number) {
    return await this.userService.delete(id);
  }
}
