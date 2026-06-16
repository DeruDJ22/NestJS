// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { UserModule } from '../user/user.module.js';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
})
export class AuthModule {}
