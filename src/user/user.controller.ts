import {
  Controller,
  Get,
  Query,
  Req,
  Param,
  ParseUUIDPipe,
  Body,
  Delete,
  Patch,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { GetUsersFilterDto } from "./dto/get-user-filter.dto";
import { User } from "@prisma/client";
import { Public } from "src/auth/decorators/public.decorator";
import { ApiResponseMeta } from "src/common/decorators/response.decorator";
import { UpdateUserDto } from "./dto/update-user.dto";
@ApiBearerAuth()
@ApiTags("Users")
@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Public()
  @Get()
  async getAll(@Query() filtersDto: GetUsersFilterDto, @Req() req: User) {
    return this.userService.getAll(filtersDto, req);
  }

  @Public()
  @Get("/:id/info")
  async getOne(@Param("id", ParseUUIDPipe) id: string, @Req() req: User) {
    return this.userService.getOne(id, req);
  }

  @Patch("/:id/update")
  async updateUser(
    @Req() authUser: User,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.updateUser(authUser, id, dto);
  }

  @ApiResponseMeta({ message: "User archived successfully!" })
  @Delete("/:id/archive")
  async deleteSample(@Param("id", ParseUUIDPipe) id: string) {
    return this.userService.archiveUser(id);
  }
}
