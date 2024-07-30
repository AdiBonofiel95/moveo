import { ArgumentsHost, BadRequestException, Catch, HttpException, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { LoggerService } from "./logger/logger.service";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { ResponseObj } from "utilities/types";
import { Response, Request } from "express";
import { error } from "console";
import { PrismaErrorCode } from "utilities/globals";

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    private readonly logger = new LoggerService(AllExceptionsFilter.name)

    catch(exception: unknown, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const request = context.getRequest<Request>();

        const myResponseObj: ResponseObj = {
            statusCode: 500,
            timestamp: new Date().toISOString(),
            path: request.url,
            response: '',
        }

        // Add more Prisma Error Types if you want
        if (exception instanceof BadRequestException){ 
            myResponseObj.statusCode = exception.getStatus();
            myResponseObj.response = exception.message;
        }
        else if (exception instanceof HttpException){
            myResponseObj.statusCode = exception.getStatus();
            myResponseObj.response = exception.getResponse();
        }
        else if (exception instanceof PrismaClientValidationError){ 
            myResponseObj.statusCode = PrismaErrorCode;
            myResponseObj.response = exception.message.replaceAll(/\n/g, ' ');
        }
        else if (exception instanceof PrismaClientKnownRequestError){
            myResponseObj.statusCode = PrismaErrorCode;
            myResponseObj.response = exception.message.replaceAll(/\n/g, ' ');
        } 
        else {
            myResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR
            myResponseObj.response = 'Internal Server Error'
        }
        console.log(error);

        response 
            .status(myResponseObj.statusCode) 
            .json(myResponseObj)

        this.logger.error(myResponseObj.response, AllExceptionsFilter.name);
        super.catch(exception, host);
    }
}