import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AppUtilities } from '../app.utilities';
import { ScoutWatchListService } from './watchlist.service';

@Module({
  providers: [ScoutWatchListService, PrismaClient, AppUtilities],
  exports: [ScoutWatchListService ],
})
export class ScoutWatchListModule {}
