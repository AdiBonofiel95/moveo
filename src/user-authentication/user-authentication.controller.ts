import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserAuthenticationService } from './user-authentication.service';


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
