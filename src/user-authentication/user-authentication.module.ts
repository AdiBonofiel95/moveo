import { Module } from '@nestjs/common';
import { UserAuthenticationService } from './user-authentication.service';
import { AuthenticationConfig } from './authentication.config';
import { UserAuthenticationController } from './user-authentication.controller';

/**
 * User Authentication Module
 * 
 * The UserAuthenticationModule integrates the authentication service, authentication controller 
 * and the authentication config.
 */
@Module({
  controllers: [UserAuthenticationController],
  providers: [UserAuthenticationService, AuthenticationConfig],
})
export class UserAuthenticationModule {}
