import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs'
import * as path from 'path'
import { getCurrentDateFormatted } from 'utilities/functions';

@Injectable()
export class LoggerService extends ConsoleLogger{
    
    async logToFile(entry){
        const formattedEntry = `${Intl.DateTimeFormat('en-GB', {
            dateStyle: 'short',
            timeStyle: 'short',
            timeZone: 'Asia/Jerusalem',
        }).format(new Date())}\t${entry}\n`

        try {
            if (!fs.existsSync(path.join(__dirname, '..', '..', '..', 'logs'))){
                await fsPromises.mkdir(path.join(__dirname, '..', '..', '..', 'logs'));
            }
            await fsPromises.appendFile(
                path.join(__dirname, '..', '..', '..', 'logs', `LogFile_${getCurrentDateFormatted()}.log`), formattedEntry
            );
        } catch (e) {
            if (e instanceof Error) console.error(e.message)
        }
    }

    log(message: any, context?: string) {
        const entry = `${context}\t${message}`
        this.logToFile(entry)
        super.log(message, context)
    }

    error(message: any, stackOrContext?: string) {
        const entry = `${stackOrContext}\t${message}`
        this.logToFile(entry)
        super.error(message, stackOrContext)
    }
}
