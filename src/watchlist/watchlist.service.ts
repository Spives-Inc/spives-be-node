import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { CrudService } from '../common/database/crud.service';
import { AppUtilities } from '../app.utilities';
import { ScoutWatchListMapType } from './watchlist.maptype';
import moment from 'moment';
import { GetWatchListFilterDto, MapWatchListOrderByToValue } from './dto/get-watchlist-filter.dto';
import { CreateScoutWatchListDto } from './dto/create-watchlist.dto';
import { UpdateScoutWatchListDto } from './dto/update-watchlist.dto';

@Injectable()
export class ScoutWatchListService extends CrudService<
  Prisma.ScoutWatchListDelegate, ScoutWatchListMapType>{
  constructor(private prisma: PrismaClient) {
    super(prisma.scoutWatchList);
  }

  async getAll(
    { page, size, orderBy, cursor, direction, ...filters }: GetWatchListFilterDto,
    req: User,
  ) {
    const parseSplittedTermsQuery = (term: string) => {
      const parts = term.trim().split(/\s+/);
      if (parts.length > 0) {
        return {
          name: { in: parts, mode: 'insensitive' },
        };
      }
      return undefined;
    };

    const parsedQueryFilters = this.parseQueryFilter(filters, [
      {
        key: 'term',
        where: parseSplittedTermsQuery,
      },
      {
        key: 'startDate',
        where: (startDate, filterDto) => {
          const mStartDate = moment
            .parseZone(filterDto.startDate)
            .startOf('day')
            .toDate();
          return {
            createdAt: {
              gte: mStartDate,
              ...(!filterDto.endDate && {
                lte: moment
                  .parseZone(filterDto.startDate)
                  .endOf('day')
                  .toDate(),
              }),
            },
          };
        },
      },
      {
        key: 'endDate',
        where: (endDate, filterDto) => {
          const mEndDate = moment
            .parseZone(filterDto.endDate)
            .endOf('day')
            .toDate();
          return {
            createdAt: {
              lte: mEndDate,
              ...(!filterDto.startDate && {
                gte: moment
                  .parseZone(filterDto.endDate)
                  .startOf('day')
                  .toDate(),
              }),
            },
          };
        },
      },
      {
        key: 'status',
        where: (value: string) => {
          return { status: value === 'true' };
        },
      },
    ]);

    const args: Prisma.FootballClubFindManyArgs = {
      where: {
        ...parsedQueryFilters,
      },
      include: {
        country: true,
      },
    };

    return this.findManyPaginate(args, {
      page,
      size,
      cursor,
      direction,
      orderBy:
        orderBy &&
        AppUtilities.unflatten({
          [MapWatchListOrderByToValue[orderBy]]: direction,
        }),
    });
  }


  async createScoutWatchList(
    {
      talentId,
      intention,
    }: CreateScoutWatchListDto,
    req: User,
  ) {
    return this.prisma.scoutWatchList.create({
      data: {
        talent: { connect: { id: talentId } },
        ...(intention && { intention }),
        createdAt: new Date(),
      },
    });
  }

  async updateFootballClub(authUser: User, id: string, dto: UpdateScoutWatchListDto) {
    const args: Prisma.ScoutWatchListUpdateArgs = {
      where: { id },
      data: {
        ...dto,
        updatedBy: authUser.id,
      },
    };
    return this.update(args);
  }

  async deleteFootballClub(id: string) {
    const item = await this.findFirst({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException('List item not found!');
    }
    return this.delete({ where: { id } });
  }
}