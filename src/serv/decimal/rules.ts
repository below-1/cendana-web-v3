import Decimal from 'decimal.js'

export function decGreaterThan(min: string, message: string) {
  return (x: string) => {
    const decx = new Decimal(x)
    const decMin = new Decimal(min)
    return decx.gt(decMin) || message
  }
}

export function decLessThan(max: string | Decimal, message: string) {
  const decMax = (max instanceof Decimal) ? max : new Decimal(max)
  return (x: string) => {
    const decx = new Decimal(x)
    // console.log('in validation rules')
    // console.log(`x = ${x}`)
    // console.log(decx.toString())
    // console.log(decMax.toString())
    // console.log(decx.lt(decMax))
    // console.log('======')
    return decx.lte(decMax) || message
  }
}