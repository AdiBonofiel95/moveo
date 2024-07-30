import { Project, Task } from "@prisma/client"


export type ResponseObj = {
    statusCode: number,
    timestamp: string,
    path: string,
    response: string | object,
}


export type PageObj = {
    page: number,
    data: Task[] | Project[]
}
