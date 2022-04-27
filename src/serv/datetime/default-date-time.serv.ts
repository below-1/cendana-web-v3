import { format } from 'date-fns'
import { today } from './today.serv'

export function defaultDateTime() {
  const now = today()
  return format(now, 'yyyy-MM-dd HH:mm')
}
