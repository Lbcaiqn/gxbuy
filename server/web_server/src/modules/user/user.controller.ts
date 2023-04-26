import { Controller, UseGuards, SetMetadata, Get, Post, Req, Res, Body, Patch, Param, Delete } from '@nestjs/common';
import { JwtGuard } from '@/common/guard/jwt.guard';
import { UserService } from './user.service';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { ValidatePipe } from '@/common/pipe/validate.pipe';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@Controller({
  path: 'user',
  version: '1',
})
@ApiTags('用户相关接口')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiOperation({ summary: '用户注册', description: '用户注册' })
  register(@Body(ValidatePipe) registerInfo: UserRegisterDto) {
    return this.userService.register(registerInfo);
  }

  @Post('/login')
  @ApiOperation({ summary: '用户登录', description: '用户登录' })
  login(@Req() req, @Body(ValidatePipe) loginInfo: UserLoginDto) {
    return this.userService.login(req.session.code, loginInfo);
  }

  @Get('/code')
  @ApiOperation({ summary: '获取验证码', description: '获取验证码' })
  createCode(@Req() req, @Res() res) {
    return this.userService.createCode(req, res);
  }

  @Get('/jwt/getUserInfo')
  @SetMetadata('jwt', true)
  @ApiOperation({ summary: '获取用户个人信息', description: '获取用户个人信息' })
  @ApiBearerAuth()
  getUserInfo(@Req() req) {
    return this.userService.getUserInfo(req);
  }

  @Get('/jwt/getUserRecord')
  @SetMetadata('jwt', true)
  @ApiOperation({ summary: '获取用户其他信息', description: '收藏、关注、浏览记录、搜索记录' })
  @ApiQuery({ name: 'feature', description: '特征信息', required: true, type: 'string' })
  @ApiQuery({ name: 'pageSize', description: '每页数量', required: true, type: 'number' })
  @ApiQuery({ name: 'page', description: '页数', required: true, type: 'number' })
  @ApiBearerAuth()
  getUserRecord(@Req() req) {
    return this.userService.getUserRecord(req);
  }

  @Post('/jwt/favorite')
  @SetMetadata('jwt', true)
  @ApiOperation({ summary: '收藏商品', description: '收藏商品' })
  @ApiBearerAuth()
  favorite(@Req() req) {
    return this.userService.favorite(req);
  }

  @Post('/jwt/follow')
  @SetMetadata('jwt', true)
  @ApiOperation({ summary: '关注商家', description: '关注商家' })
  @ApiBearerAuth()
  follow(@Req() req) {
    return this.userService.follow(req);
  }
}
