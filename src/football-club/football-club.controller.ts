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
import { FootballClubService } from './football-club.service';
import { GetFootballClubFilterDto } from './dto/get-football-club-filter.dto';
import { CreateFootballClubDto } from './dto/create-football-club.dto';
import { User } from '@prisma/client';
import { ApiResponseMeta } from 'src/common/decorators/response.decorator';
import { UpdateFootballClubDto } from './dto/update-football-club.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiBearerAuth()
@ApiTags('Football Clubs')
@Controller('football-club')
export class FootballClubController {
  constructor(private readonly footballClubService: FootballClubService) {}

  @Public()
  @Get()
  async getAll(
    @Query() filtersDto: GetFootballClubFilterDto,
    @Req() req: User,
  ) {
    return this.footballClubService.getAll(filtersDto, req);
  }

  @Get('/:id/info')
  async getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.footballClubService.findFirstOrThrow({ where: { id } });
  }

  @Public()
  @Post()
  async createFootballClub(
    @Req() req: User,
    @Body() dto: CreateFootballClubDto,
  ) {
    return this.footballClubService.createFootballClub(dto, req);
  }

  @Patch('/:id/update')
  async updateFootballClub(
    @Req() req: User,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateFootballClubDto,
  ) {
    return this.footballClubService.updateFootballClub(req, id, dto);
  }

  @ApiResponseMeta({ message: 'Football club successfully deleted!' })
  @Delete('/:id/delete')
  async deleteFootballClub(@Param('id', ParseUUIDPipe) id: string) {
    return this.footballClubService.deleteFootballClub(id);
  }
}