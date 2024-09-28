export const convertISOToDate = (isoString: string): string => {
    const date = new Date(isoString);
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    //const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${day}-${month}-${year}`;
  };

  export const convertISOToTime = (isoString: string): string => {
    const date = new Date(isoString);
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    //const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${hours}:${minutes}`;
  };