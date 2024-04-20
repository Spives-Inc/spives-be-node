import { Prisma as Prisma, PrismaClient as PrismaClient } from "@prisma/client";
import { CrudService } from "../../common/database/crud.service";
import { PaginationSearchOptionsDto } from "../../common/interfaces/pagination-search-options.dto";
import { Injectable } from "@nestjs/common";
import { NationalityMapType } from "./nationality.maptype";

@Injectable()
export class NationalityService extends CrudService<
  Prisma.NationalityDelegate,
  NationalityMapType
> {
  constructor(private prismaClient: PrismaClient) {
    super(prismaClient.nationality);
  }

  getCountries(dto: PaginationSearchOptionsDto) {
    const parsedQueryFilters = this.parseQueryFilter(dto, [
      "name",
      "iso2",
      "iso3",
      "continent",
      "timeZone",
    ]);
    const args: Prisma.NationalityFindManyArgs = {
      where: parsedQueryFilters,
    };
    dto.orderBy = "name";

    return this.findManyPaginate(args, dto);
  }
}
