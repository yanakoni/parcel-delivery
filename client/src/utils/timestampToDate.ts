import { format } from 'date-fns';
import { TimeFormat, DateFormat } from '../enums';

const formatTimeMap: Record<TimeFormat, string> = {
  '12h': 'KK:mm',
  '24h': 'HH:mm',
};

const formatDateMap: Record<DateFormat, string> = {
  'D-M-Y': 'dd-MM-Y',
  'M-D-Y': 'MM-dd-Y',
  'Y-M-D': 'Y-MM-dd',
};

interface Options {
  timeFormat: TimeFormat;
  dateFormat: DateFormat;
}

export const timestampToDate = (
  timestamp: number,
  { timeFormat, dateFormat }: Options,
) => {
  return format(
    timestamp,
    `${formatDateMap[dateFormat]} ${formatTimeMap[timeFormat]}`,
  );
};
