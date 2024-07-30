import { ArgumentsHost, BadRequestException, Catch, HttpException, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { LoggerService } from "./logger/logger.service";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { ResponseObj } from "utilities/types";
import { Response, Request } from "express";
import { error } from "console";
import { PrismaErrorCode } from "utilities/globals";

/**
 * AllExceptionsFilter class.
 * 
 * This class is in charge of error handling in the application. it catches all the errors that were thrown during the runtime
 * of the application and logs them using the logger. this class extends the base exception filter proveded by Nestjs.
 */
@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    private readonly logger = new LoggerService(AllExceptionsFilter.name)

    /**
     * this function catches all the thrown exceptions. it logs the exception using the logger.
     * @param exception - the exception that was thrown
     * @param host - Provides methods for retrieving the arguments being passed to a handler.
     */
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