import { Injectable, NotFoundException } from "@nestjs/common";
import {
  Prisma as Prisma,
  PrismaClient as PrismaClient,
  User,
} from "@prisma/client";
import { CrudService } from "../common/database/crud.service";
import moment from "moment";
import { AppUtilities } from "../app.utilities";
import { PlayerCardMapType } from "./card-mapetype";
import {
  GetPlayerCardFilterDto,
  MapPlayerCardOrderByToValue,
} from "./dto/get-card-filter.dto";
import { CreatePlayerCardDto } from "./dto/create-card.dto";
import { UpdatePlayerCardDto } from "./dto/update-card.dto";

@Injectable()
export class PlayerCardService extends CrudService<Prisma.PlayerCardDelegate, PlayerCardMapType> {
  constructor(private prisma: PrismaClient) {
    super(prisma.playerCard);
  }

  async getAll(
    { page, size, orderBy, cursor, direction, ...filters }: GetPlayerCardFilterDto,
    req: User,
  ) {
    const parseSplittedTermsQuery = (term: string) => {
      const parts = term.trim().split(/\s+/);
      if (parts.length > 0) {
        return {
          name: { in: parts, mode: "insensitive" },
        };
      }
      return undefined;
    };

    const parsedQueryFilters = this.parseQueryFilter(filters, [
      {
        key: "term",
        where: parseSplittedTermsQuery,
      },
      {
        key: "startDate",
        where: (startDate, filterDto) => {
          const mStartDate = moment
            .parseZone(filterDto.startDate)
            .startOf("day")
            .toDate();
          return {
            createdAt: {
              gte: mStartDate,
              ...(!filterDto.endDate && {
                lte: moment
                  .parseZone(filterDto.startDate)
                  .endOf("day")
                  .toDate(),
              }),
            },
          };
        },
      },
      {
        key: "endDate",
        where: (endDate, filterDto) => {
          const mEndDate = moment
            .parseZone(filterDto.endDate)
            .endOf("day")
            .toDate();
          return {
            createdAt: {
              lte: mEndDate,
              ...(!filterDto.startDate && {
                gte: moment
                  .parseZone(filterDto.endDate)
                  .startOf("day")
                  .toDate(),
              }),
            },
          };
        },
      },
      {
        key: "status",
        where: (value: string) => {
          return { status: value === "true" };
        },
      },
    ]);

    const args: Prisma.PlayerCardFindManyArgs = {
      where: {
        ...parsedQueryFilters,
      },
      include: {
        user: true,
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
          [MapPlayerCardOrderByToValue[orderBy]]: direction,
        }),
    });
  }

  async createPlayerCard(
    {
      userId,
      name,
      value,
      code,
    }: CreatePlayerCardDto,
    Req: User,
  ) {
    return this.prisma.playerCard.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        name,
        ...(value && { value }),
        ...(code && { code }),
        createdAt: new Date(),
      },
    });
  }

  async updatePlayerCard(authUser: User, id: string, dto: UpdatePlayerCardDto) {
    const args: Prisma.PlayerCardUpdateArgs = {
      where: { id },
      data: {
        ...dto,
        updatedBy: authUser.id,
      },
    };
    return this.update(args);
  }

  async cancelPlayerCard(id: string) {
    const card = await this.findFirst({
      where: { id },
    });
    if (!card) {
      throw new NotFoundException("Player Card not found!");
    }
    return this.update({
      where: { id },
      data: {
        status: false,
      },
    });
  }
}
