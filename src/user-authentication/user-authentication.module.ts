import { Module } from '@nestjs/common';
import { UserAuthenticationService } from './user-authentication.service';
import { AuthenticationConfig } from './authentication.config';
import { UserAuthenticationController } from './user-authentication.controller';

@Module({
  controllers: [UserAuthenticationController],
  providers: [UserAuthenticationService, AuthenticationConfig],
})
export class UserAuthenticationModule {}
