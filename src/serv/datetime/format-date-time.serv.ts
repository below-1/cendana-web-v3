import { format } from 'date-fns';

export function formatDateTime(d: Date | string) {
  const dt = d instanceof Date ? d : new Date(d)
  return format(dt, 'yyyy-MM-dd HH:mm');
}
