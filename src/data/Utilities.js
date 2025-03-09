
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { startOfWeek, addDays, format, parseISO } from "date-fns";
export const searchableQuery = (payload) => {
    let search_query = "";
    let count = 0;
    let starter = ''


    // Check if payload is defined and is an object
    if (typeof payload === 'object' && payload !== null) {
        Object.entries(payload).forEach(([key, value]) => {
            if (count === 0) {
                if(value !== null) {
                    search_query += '?' + key + '=' + value;
                    starter = 's'
                }
            } else {
                if(value !== null) {
                    if(starter === '')
                    {
                        starter = 's'
                        search_query += '?' + key + '=' + value;
                    }else{
                        search_query += '&' + key + '=' + value;
                    }
                }
            }
            count++;
        });
    }

    return search_query;
};

export function userGender(gender){
    if (gender === 1)
    {
        return "Male"
    }else if (gender === 2 )
    {
        return "Female"
    }else if (gender === 3 )
    {
        return "Transgender"
    }else{
        return "Not Specified"
    }
 }

export function getJoinedTime(unixTimestamp) {
    const seconds = parseInt(unixTimestamp, 10);
    const date = new Date(seconds * 1000); // Convert to milliseconds
    const now = new Date();
  
    const diffInSeconds = Math.floor((now - date) / 1000);
  
    const units = [
      { name: 'year', seconds: 31536000 },
      { name: 'month', seconds: 2592000 },
      { name: 'week', seconds: 604800 },
      { name: 'day', seconds: 86400 },
      { name: 'hour', seconds: 3600 },
      { name: 'minute', seconds: 60 },
      { name: 'second', seconds: 1 },
    ];
  
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  
    for (const unit of units) {
      const interval = Math.floor(diffInSeconds / unit.seconds);
      if (interval >= 1) {
        return ` ${rtf.format(-interval, unit.name)}`;
      }
    }
  
    return ' just now';
  }

export const getFullDateFromWeek = (year, weekNumber, dayName) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    // Get index of the day
    const dayIndex = daysOfWeek.indexOf(dayName);
  
    if (dayIndex === -1) return null; // Invalid day name
  
    // Get January 4th of the given year (to align with ISO week numbering)
    const firstThursday = new Date(year, 0, 4);
  
    // Calculate first week’s Monday (ISO weeks start on Monday)
    const firstWeekMonday = startOfWeek(firstThursday, { weekStartsOn: 0 });
  
    // Calculate the start of the given week
    const startOfTargetWeek = addDays(firstWeekMonday, (weekNumber - 1) * 7);
  
    // Get the exact date by adding the day index
    const targetDate = addDays(startOfTargetWeek, dayIndex);
  
    return format(targetDate, "yyyy-MM-dd");
  };


  export const exportToExcel = (tableRef, fileName)=> {
    if (!tableRef.current) return;
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(tableRef.current);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });

    saveAs(data, fileName+".xlsx");
  }
  

  export const getLocalDate = () => {
    return new Date().toLocaleDateString("en-CA"); // en-CA ensures YYYY-MM-DD format
  };

  export const  bytesToMB = (bytes, decimals = 2)  =>{
    if (typeof bytes !== 'number') {
        return 'Invalid input';
      }
    
      if (bytes === 0) return '0 Bytes';
    
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
      const i = Math.floor(Math.log(bytes) / Math.log(k));
    
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }