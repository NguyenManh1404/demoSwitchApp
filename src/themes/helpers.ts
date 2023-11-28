import unidecode from 'unidecode';

const normalizeString = (text: string) => {
  // Loại bỏ dấu và chuyển chữ hoa thành chữ thường
  return unidecode(text).toLowerCase();
};

const convertIsoDateToFormattedString = (isoDateString: Date) => {
  const date = new Date(isoDateString);

  const day = date.getDate();
  const month = date.getMonth() + 1; // Month is zero-based, so add 1
  const year = date.getFullYear();

  // Ensure that day and month have two digits
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
};

export {normalizeString, convertIsoDateToFormattedString};
