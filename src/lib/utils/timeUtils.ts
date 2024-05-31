export const JamKeMenit = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };
  
  export const Jakarta = (): string => {
    const currentTime = new Date();
    const waktuJakarta = new Date(currentTime.getTime() + 7 * 60 * 60 * 1000);
    return waktuJakarta.toISOString().slice(11, 16);
  };
  
  export const SelisihWaktu = (scheduleTime: string): number | string => {
    const currentTime = Jakarta();
    const [currentTimeHours, currentTimeMinutes] = currentTime.split(":").map(Number);
    const [scheduleTimeHours, scheduleTimeMinutes] = scheduleTime.split(":").map(Number);
  
    const diffMinutes = (scheduleTimeHours - currentTimeHours) * 60 + (scheduleTimeMinutes - currentTimeMinutes);
    return diffMinutes >= 0 ? diffMinutes : "N/A";
  };
  
  export const formatTime = (time: string): string => time;
  