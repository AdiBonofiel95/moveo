

export function craftMessage(requestType:String, messageContent:String):String {
    return `User requested to ${requestType} ${messageContent}`;
}


export function getCurrentDateFormatted():String {
    const today = new Date();
    
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = today.getFullYear();
  
    return `${day}_${month}_${year}`;
}