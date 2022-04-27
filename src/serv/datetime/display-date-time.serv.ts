import { format } from 'date-fns'
import { id } from 'date-fns/locale'

export function displayDateTime(d: string | Date) {
  const date = (d instanceof Date) ? d : new Date(d)
  return format(date, 'd MMMM yyyy, HH:mm', { locale: id })
}