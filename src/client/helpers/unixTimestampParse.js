import moment from 'moment';

export default (timestamp) => {
  const date = moment.unix(timestamp);
  const isToday = date.isSame(moment(), 'day');
  const isYesterday = date.isSame(moment().subtract(1, 'days'), 'day');

  let dateString = '';

  if (isToday) {
    dateString = 'Today';
  } else if (isYesterday) {
    dateString = 'Yesterday';
  } else {
    dateString = `${moment().diff(date, 'days')} days`;
  }
  return dateString;
};
