import {
  Controller,
  Post,
  Get,
  Query,
  Body,
  Req,
  Param,
  ParseUUIDPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { ApiResponseMeta } from 'src/common/decorators/response.decorator';
import { PlayerCardService } from './card.service';
import { GetPlayerCardFilterDto } from './dto/get-card-filter.dto';
import { CreatePlayerCardDto } from './dto/create-card.dto';
import { UpdatePlayerCardDto } from './dto/update-card.dto';
import { Public } from 'src/auth/decorators/public.decorator';
// import { Public } from '@prisma/client/runtime/library';

@ApiBearerAuth()
@ApiTags('Player Cards')
@Controller('player-card')
export class PlayerCardController {
  constructor(private readonly playerCardService: PlayerCardService) {}

  @Public()
  @Get()
  async getAll(
    @Query() filtersDto: GetPlayerCardFilterDto,
    @Req() req: User,
  ) {
    return this.playerCardService.getAll(filtersDto, req);
  }

  @Public()
  @Get('/:id/info')
  async getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.playerCardService.findFirstOrThrow({ where: { id } });
  }

  
  @Post()
  async createFootballClub(
    @Req() req: User,
    @Body() dto: CreatePlayerCardDto,
  ) {
    return this.playerCardService.createPlayerCard(dto, req);
  }

  @Patch('/:id/update')
  async updateFootballClub(
    @Req() req: User,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePlayerCardDto,
  ) {
    return this.playerCardService.updatePlayerCard(req, id, dto);
  }

  @ApiResponseMeta({ message: 'Football club successfully deleted!' })
  @Delete('/:id/delete')
  async deleteFootballClub(@Param('id', ParseUUIDPipe) id: string) {
    return this.playerCardService.cancelPlayerCard(id);
  }
}