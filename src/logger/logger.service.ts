import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs'
import * as path from 'path'
import { getCurrentDateFormatted } from 'utilities/functions';

/**
 * Logger Service class.
 * 
 * This class is in charge logging messeges whenever it was requested to do so. The class extends the basic console logger, 
 * so it both logs to the console, as well as to a log file.
 */
@Injectable()
export class LoggerService extends ConsoleLogger{
    
    /**
     * This function logs a given entry to a log file. The log file records all the logs of a current day, 
     * and a new file is created whenever the logger is called on a different day.
     * @param entry the entry we wish to log to the file.
     */
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

    /**
     * log function. this function creates the entry and logs it to a file using logToFile, as well
     * as prints the log to the console (with super).
     * @param message - the message we wish to log.
     * @param context - the caller of the logger.
     */
    log(message: any, context?: string) {
        const entry = `${context}\t${message}`
        this.logToFile(entry)
        super.log(message, context)
    }

    /**
     * this function is in charge of logging errors both to the file and to the console.
     * @param message - the error message we wish to log.
     * @param stackOrContext - the caller of the logger or the stack of the error.
     */
    error(message: any, stackOrContext?: string) {
        const entry = `${stackOrContext}\t${message}`
        this.logToFile(entry)
        super.error(message, stackOrContext)
    }
}
