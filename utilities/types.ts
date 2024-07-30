import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export type ResponseObj = {
    statusCode: number,
    timestamp: string,
    path: string,
    response: string | object,
}



export class PaginationObj {
    @Min(1)
    @Type(() => Number)
    @IsInt()
    page?: number;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number;
}