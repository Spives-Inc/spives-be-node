import { Module } from "@nestjs/common";
import { PlayerCardService } from "./card.service";
import { PrismaClient } from "@prisma/client";
import { AppUtilities } from "../app.utilities";

@Module({
  providers: [PlayerCardService, PrismaClient, AppUtilities],
  exports: [PlayerCardService ],
})
export class PlayerCardModule {}
