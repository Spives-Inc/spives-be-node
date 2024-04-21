import { Global, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AppUtilities } from "./app.utilities";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";
import appConfig from "./app.config";
import { UserController } from "./user/user.controller";
import { APP_GUARD } from "@nestjs/core";
import { JwtGuard } from "./auth/guards/jwt.guard";
import { BaseModule } from "./base/base-module";
import { FootballClubModule } from "./football-club/football-club.module";
import { PlayerCardModule } from "./player-card/card.module";
import { FootballClubController } from "./football-club/football-club.controller";
import { PlayerCardController } from "./player-card/card.controller";
import { ScoutWatchListModule } from "./watchlist/watchlist.module";
import { ScoutWatchListController } from "./watchlist/watchlist.controller";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    AuthModule,
    BaseModule,
    UserModule,
    FootballClubModule,
    PlayerCardModule,
    ScoutWatchListModule,
  ],
  controllers: [
    AppController,
    UserController,
    FootballClubController,
    PlayerCardController,
    ScoutWatchListController,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    AppUtilities,
  ],
  exports: [
    AuthModule,
    AppUtilities,
    UserModule,
    BaseModule,
    FootballClubModule,
    PlayerCardModule,
    ScoutWatchListModule,
  ],
})
export class AppModule {}
