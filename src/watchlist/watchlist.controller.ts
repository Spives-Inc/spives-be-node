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
import { ScoutWatchListService } from './watchlist.service';
import { GetWatchListFilterDto } from './dto/get-watchlist-filter.dto';
import { CreateScoutWatchListDto } from './dto/create-watchlist.dto';
import { UpdateScoutWatchListDto } from './dto/update-watchlist.dto';

@ApiBearerAuth()
@ApiTags('Scout Watch List')
@Controller('scout-watch-list')
export class ScoutWatchListController {
  constructor(private readonly scoutWatchListService: ScoutWatchListService) {}

  @Get()
  async getAll(
    @Query() filtersDto: GetWatchListFilterDto,
    @Req() req: User,
  ) {
    return this.scoutWatchListService.getAll(filtersDto, req);
  }

  @Get('/:id/info')
  async getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.scoutWatchListService.findFirstOrThrow({ where: { id } });
  }

  @Post()
  async createScoutWatchList(
    @Req() req: User,
    @Body() dto: CreateScoutWatchListDto,
  ) {
    return this.scoutWatchListService.createScoutWatchList(dto, req);
  }

  @Patch('/:id/update')
  async updateScoutWatchList(
    @Req() req: User,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateScoutWatchListDto,
  ) {
    return this.scoutWatchListService.updateFootballClub(req, id, dto);
  }

  @ApiResponseMeta({ message: 'Football club successfully deleted!' })
  @Delete('/:id/delete')
  async deleteScoutWatchList(@Param('id', ParseUUIDPipe) id: string) {
    return this.scoutWatchListService.deleteFootballClub(id);
  }
}