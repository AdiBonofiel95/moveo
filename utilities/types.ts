import { Type } from "class-transformer";
import { IsPositive, Min } from "class-validator";
import { MinCurrentPagePagination, MinTotalCountPagination, MinTotalPagesPagination } from "./globals";

/**
 * this object holds the response for an error logged in the exception filter
 */
export type ResponseObj = {
    statusCode: number,
    timestamp: string,
    path: string,
    response: string | object,
}

/**
 * this object holds the pagination data and the returned data of the requested page
 */
export type PaginationObj<T> = {
    pagination: PaginationDto,
    data: T[],
}

/**
 * this class holds the pagination data
 */
export class PaginationDto {
    @Min(MinTotalCountPagination)
    @Type(() => Number)
    totalCount: number;

    @Min(MinCurrentPagePagination)
    @Type(() => Number)
    currentPage: number;

    @IsPositive()
    @Type(() => Number)
    pageSize: number;

    @Min(MinTotalPagesPagination)
    @Type(() => Number)
    totalPages: number;
}
