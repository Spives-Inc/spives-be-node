import { CrudMapType } from "../common/interfaces/crud-map-type.interface";
import { Prisma } from "@prisma/client";

export class PlayerCardMapType implements CrudMapType {
  aggregate: Prisma.PlayerCardAggregateArgs;
  count: Prisma.PlayerCardCountArgs;
  create: Prisma.PlayerCardCreateArgs;
  createMany: Prisma.PlayerCardCreateManyArgs;
  delete: Prisma.PlayerCardDeleteArgs;
  deleteMany: Prisma.PlayerCardDeleteManyArgs;
  findFirst: Prisma.PlayerCardFindFirstArgs;
  findMany: Prisma.PlayerCardFindManyArgs;
  findUnique: Prisma.PlayerCardFindUniqueArgs;
  update: Prisma.PlayerCardUpdateArgs;
  updateMany: Prisma.PlayerCardUpdateManyArgs;
  upsert: Prisma.PlayerCardUpsertArgs;
}
