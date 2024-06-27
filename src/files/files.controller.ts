// files.controller.ts
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from 'src/multer.config';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('file')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post(':paymentId')
  @UseInterceptors(FileInterceptor('arquivo', multerConfig))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        arquivo: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiParam({ name: 'paymentId', type: 'string' })
  async uploadArquivo(
    @UploadedFile() file: Express.MulterS3.File,
    @Param('paymentId') paymentId: string,
  ) {
    if (!file) {
      throw new BadRequestException(
        'Apenas arquivos de imagem são permitidos!',
      );
    }
    return this.filesService.salvarDados(file, paymentId);
  }
}
