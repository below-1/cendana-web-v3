// Convert string in format 'yyyy-MM-dd HH:mm' to ISO 
import { parse } from 'date-fns';

export function toISO(s: string) {
  const d = parse(s, 'yyyy-MM-dd HH:mm', new Date());
  return d.toISOString();
}