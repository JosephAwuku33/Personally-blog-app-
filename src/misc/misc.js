const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const currentDate = new Date();

export const year = currentDate.getFullYear();
export const monthName = months[currentDate.getMonth()];
export const date = currentDate.getDate();

console.log(`${monthName} ${date}, ${year}`); 
