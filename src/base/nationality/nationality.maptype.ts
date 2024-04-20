import { CrudMapType } from "../../common/interfaces/crud-map-type.interface";
import { Prisma } from "@prisma/client";

export class NationalityMapType implements CrudMapType {
  aggregate: Prisma.NationalityAggregateArgs;
  count: Prisma.NationalityCountArgs;
  create: Prisma.NationalityCreateArgs;
  delete: Prisma.NationalityDeleteArgs;
  deleteMany: Prisma.NationalityDeleteManyArgs;
  findFirst: Prisma.NationalityFindFirstArgs;
  findMany: Prisma.NationalityFindManyArgs;
  findUnique: Prisma.NationalityFindUniqueArgs;
  update: Prisma.NationalityUpdateArgs;
  updateMany: Prisma.NationalityUpdateManyArgs;
  upsert: Prisma.NationalityUpsertArgs;
}
