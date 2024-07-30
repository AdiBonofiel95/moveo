

/**
 * This file exports general rutilities function that are to be used in several places 
 * in the application.
 */

/**
 * this function generates a log message of all the user requests according to a given template.
 * @param requestType - the type of request the user made.
 * @param messageContent - extra parameters the user wants to log into the message.
 * @returns - the crafted message we want to log.
 */
export function craftMessage(requestType:String, messageContent:String):String {
    return `User requested to ${requestType} ${messageContent}`;
}

/**
 * this function is in charge of generating the date right now, according to the format dd_mm_yyyy
 * @returns the formated date of right now according to the pattern.
 */
export function getCurrentDateFormatted():String {
    const today = new Date();
    
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = today.getFullYear();
  
    return `${day}_${month}_${year}`;
}