export const getCurrentTime = () => {
    const date = new Date();
    const localTime = new Date(date.getTime() );
    const hours = String(localTime.getHours()).padStart(2, '0');
    const minutes = String(localTime.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
  export const getUserTime = () => {
    const date = new Date();
    const localTime = new Date(date.getTime() );
    const hours = String(localTime.getHours()).padStart(2, '0');
    const minutes = String(localTime.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  