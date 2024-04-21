import { CrudMapType } from "../common/interfaces/crud-map-type.interface";
import { Prisma } from "@prisma/client";

export class FootballClubMapType implements CrudMapType {
  aggregate: Prisma.FootballClubAggregateArgs;
  count: Prisma.FootballClubCountArgs;
  create: Prisma.FootballClubCreateArgs;
  delete: Prisma.FootballClubDeleteArgs;
  deleteMany: Prisma.FootballClubDeleteManyArgs;
  findFirst: Prisma.FootballClubFindFirstArgs;
  findMany: Prisma.FootballClubFindManyArgs;
  findUnique: Prisma.FootballClubFindUniqueArgs;
  update: Prisma.FootballClubUpdateArgs;
  updateMany: Prisma.FootballClubUpdateManyArgs;
  upsert: Prisma.FootballClubUpsertArgs;
}
