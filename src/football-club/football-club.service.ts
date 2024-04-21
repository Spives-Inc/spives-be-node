import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { CrudService } from '../common/database/crud.service';
import { AppUtilities } from '../app.utilities';
import { MapFootballClubOrderByToValue } from './dto/get-football-club-filter.dto';
import { CreateFootballClubDto } from './dto/create-football-club.dto';
import { GetFootballClubFilterDto } from './dto/get-football-club-filter.dto';
import { FootballClubMapType } from './football-club.maptype';
import moment from 'moment';
import { UpdateFootballClubDto } from './dto/update-football-club.dto';

@Injectable()
export class FootballClubService extends CrudService<
  Prisma.FootballClubDelegate, FootballClubMapType>{
  constructor(private prisma: PrismaClient) {
    super(prisma.footballClub);
  }

  async getAll(
    { page, size, orderBy, cursor, direction, ...filters }: GetFootballClubFilterDto,
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
          [MapFootballClubOrderByToValue[orderBy]]: direction,
        }),
    });
  }


  async createFootballClub(
    {
      countryId,
      name,
      logo,
      city,
      stadium,
      founded,
      description,
      status,
      createdBy,
    }: CreateFootballClubDto,
    req: User,
  ) {
    return this.prisma.footballClub.create({
      data: {
        countryId,
        name,
        ...(logo && { logo }),
        ...(city && { city }),
        ...(stadium && { stadium }),
        ...(founded && { founded }),
        ...(description && { description }),
        ...(status !== undefined && { status }),
        ...(createdBy && { createdBy }),
        createdAt: new Date(),
      },
    });
  }

  async updateFootballClub(authUser: User, id: string, dto: UpdateFootballClubDto) {
    const args: Prisma.FootballClubUpdateArgs = {
      where: { id },
      data: {
        ...dto,
        updatedBy: authUser.id,
      },
    };
    return this.update(args);
  }

  async deleteFootballClub(id: string) {
    const club = await this.findFirst({
      where: { id },
    });
    if (!club) {
      throw new NotFoundException('Football club not found!');
    }
    return this.delete({ where: { id } });
  }
}