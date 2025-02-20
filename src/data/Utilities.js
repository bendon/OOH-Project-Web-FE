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
        return `Joined ${rtf.format(-interval, unit.name)}`;
      }
    }
  
    return 'Joined just now';
  }
  