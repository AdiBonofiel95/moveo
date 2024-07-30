import { Injectable } from '@nestjs/common';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { AuthenticationConfig } from './authentication.config';

/**
 * Authentication Service class.
 * 
 * This class is in charge of connecting and authenticating a user with the AWS Contigo user pool
 */
@Injectable()
export class UserAuthenticationService {
    
    private userPool: CognitoUserPool;
    constructor(
        private readonly AuthenticationConfig: AuthenticationConfig,
    ) {
        this.userPool = new CognitoUserPool({
        UserPoolId: this.AuthenticationConfig.userPoolId,
        ClientId: this.AuthenticationConfig.clientId,
        });
    }


    authenticateUser(user: { name: string, password: string}) {
        const { name, password } = user;

        const authenticationDetails = new AuthenticationDetails({
        Username: name,
        Password: password,
        });
        const userData = {
        Username: name,
        Pool: this.userPool,
        };

        const newUser = new CognitoUser(userData);

        return new Promise((resolve, reject) => {
            return newUser.authenticateUser(authenticationDetails, {
                onSuccess: result => {
                resolve(result);
                },
                onFailure: err => {
                reject(err);
                },
            });
        });
  }

} 
