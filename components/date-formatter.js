import { parseISO, format } from 'date-fns';

export default function DateFormatter({ dateString }) {
  const date = parseISO(dateString);
  let formattedDate = '';
  try {
    formattedDate = format(date, 'MM /	d / yyyy')
  } catch (e) {
    console.log(e);
    console.log("DATE ERROR:")
    console.log(dateString);
  }
  if(formattedDate) {
    return <time dateTime={dateString}>{format(date, 'MM /	d / yyyy')}</time>;
  }
}
