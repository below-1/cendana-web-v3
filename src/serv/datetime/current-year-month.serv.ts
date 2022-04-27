import { getYear, getMonth } from 'date-fns'
import { today } from './today.serv'

export function currentYearMonth() {
  const now = today()
  const year = getYear(now)
  const month = getMonth(now)
  console.log(`month is ${month}`)
  return {
    year,
    month
  }
}