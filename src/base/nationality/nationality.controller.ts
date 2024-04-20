import { StateService } from "../base-state/state.service";
import { PaginationSearchOptionsDto } from "../../common/interfaces/pagination-search-options.dto";
import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  Req,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Nationality, Prisma, User } from "@prisma/client";
import { NationalityService } from "./nationality.service";
import { Public } from "src/auth/decorators/public.decorator";

@ApiTags("Nationalities & Currencies")
@Controller("nationalities")
export class NationalityController {
  constructor(
    private readonly nationalityService: NationalityService,
    private readonly stateService: StateService,
  ) {}

  @Public()
  @Get()
  async findAll(@Query() dto: PaginationSearchOptionsDto) {
    return this.nationalityService.getCountries(dto);
  }

  @Public()
  @Get("/:id")
  async findOne(
    @Param("id", ParseUUIDPipe) id: string,
    @Req() req: User,
    useSelect = true,
  ) {
    const dto: Prisma.NationalityFindFirstArgs = {
      where: { id: id },
      include: { states: true },
    };

    const result = await this.nationalityService.findFirstOrThrow(dto);

    const retComp: Nationality = <Nationality>result;
    return result;
  }

  @Public()
  @Get(":id/states")
  async getStates(
    @Param("id", ParseUUIDPipe) id: string,
    @Query() { term, ...pagination }: PaginationSearchOptionsDto,
  ) {
    const dto: Prisma.StateFindManyArgs = {
      where: { nationalityId: id },
    };

    dto.where = term
      ? {
          AND: [{ ...dto.where }],
          OR: [
            {
              name: {
                contains: term,
                mode: "insensitive",
              },
            },
            {
              iso2: {
                contains: term,
                mode: "insensitive",
              },
            },
          ],
        }
      : dto.where;

    // if (req.selectFields) {
    //   dto.select = req.selectFields;
    // }
    return this.stateService.findManyPaginate(dto, pagination);
  }

  @Public()
  @Get("/:nationalityId/states/:id")
  async findOneState(
    @Param("id", ParseUUIDPipe) id: string,
    @Param("nationalityId", ParseUUIDPipe) nationalityId: string,
  ) {
    const dto: Prisma.StateFindFirstArgs = {
      where: { nationalityId: nationalityId, id: id },
    };

    // if (req.selectFields) {
    //   dto.select = req.selectFields;
    // }
    return this.stateService.findFirstOrThrow(dto);
  }
}
