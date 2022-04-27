import { rupiah } from 'src/serv/currency';

export default function fieldsToRupiah(obj: any) {
  const { target, ...rest } = obj
  let result: any = {
    target
  }
  Object.keys(rest).forEach(k => {
    result[k] = rupiah(rest[k])
  })
  return result
}