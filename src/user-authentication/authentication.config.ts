import { Injectable } from '@nestjs/common';

/**
 * Authentication Config class.
 * 
 * This class holds the necessary parameters, so the authentication service can connect to the 
 * AWS Contigo User Pool.
 */
@Injectable()
export class AuthenticationConfig {
    public userPoolId: string = process.env.COGNITO_USER_POOL_ID;
    public clientId: string = process.env.COGNITO_CLIENT_ID;
    public region: string = process.env.COGNITO_REGION;
    public authority = `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`;
}