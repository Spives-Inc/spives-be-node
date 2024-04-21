import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AppUtilities } from '../app.utilities';
import { FootballClubService } from './football-club.service';

@Module({
  providers: [FootballClubService, PrismaClient, AppUtilities],
  exports: [FootballClubService ],
})
export class FootballClubModule {}
