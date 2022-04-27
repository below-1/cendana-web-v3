import { format } from 'date-fns';

export function defaultDate() {
  const now = new Date();
  return format(now, 'YYYY/MM/dd');
}
