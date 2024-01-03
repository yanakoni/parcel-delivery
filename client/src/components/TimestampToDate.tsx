import { FC } from 'react';
import { useUserData } from '../hooks';
import { timestampToDate } from '../utils';

interface TimestampToDateProps {
  value: number;
}

export const TimestampToDate: FC<TimestampToDateProps> = ({ value }) => {
  const userData = useUserData();

  const { timeFormat, dateFormat } = userData.settings.preferences;

  return timestampToDate(value, { timeFormat, dateFormat });
};
