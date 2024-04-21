import { CrudMapType } from "../common/interfaces/crud-map-type.interface";
import { Prisma } from "@prisma/client";

export class ScoutWatchListMapType implements CrudMapType {
  aggregate: Prisma.ScoutWatchListAggregateArgs;
  count: Prisma.ScoutWatchListCountArgs;
  create: Prisma.ScoutWatchListCreateArgs;
  delete: Prisma.ScoutWatchListDeleteArgs;
  deleteMany: Prisma.ScoutWatchListDeleteManyArgs;
  findFirst: Prisma.ScoutWatchListFindFirstArgs;
  findMany: Prisma.ScoutWatchListFindManyArgs;
  findUnique: Prisma.ScoutWatchListFindUniqueArgs;
  update: Prisma.ScoutWatchListUpdateArgs;
  updateMany: Prisma.ScoutWatchListUpdateManyArgs;
  upsert: Prisma.ScoutWatchListUpsertArgs;
}
