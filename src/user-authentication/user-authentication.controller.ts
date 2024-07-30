import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserAuthenticationService } from './user-authentication.service';

/**
 * Authentication Controller class.
 * 
 * This class is in charge of the client login requests, as they want to login 
 * by using the AWS Contigo user puul
 */
@Controller('user-authentication')
export class UserAuthenticationController {

    constructor(private readonly authenticationService: UserAuthenticationService) {}

    @Post('login')
    async login(@Body() authenticateRequest: { name: string, password: string }) {
        try {
            return await this.authenticationService.authenticateUser(authenticateRequest);
        }
        catch (ex) {
            throw new BadRequestException(ex.message);
        }
    }

}
