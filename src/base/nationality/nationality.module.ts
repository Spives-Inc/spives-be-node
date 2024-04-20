import { StateService } from "../base-state/state.service";
import { Module } from "@nestjs/common";
import { NationalityController } from "./nationality.controller";
import { NationalityService } from "./nationality.service";
import { PrismaClient } from "@prisma/client";

@Module({
  providers: [NationalityService, StateService, PrismaClient],
  controllers: [NationalityController],
})
export class CountryModule {}
