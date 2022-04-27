import { rupiah } from 'src/serv/currency'

export function formatTransactionType(s: string) {
  if (s == 'CREDIT') {
    return 'pengeluaran'
  } else if (s == 'DEBIT') {
    return 'pemasukan'
  }
  throw new Error(`unknown transaction type = ${s}`)
}

export function formatPaymentMethod(s: string) {
  if (s == 'CASH') {
    return 'Kes'
  } else if (s == 'ONLINE') {
    return 'Online'
  }
  return s
}

export function formatTransactionStatus(s: string) {
  if (s == 'SUCCESS') {
    return 'berhasil'
  } else if (s == 'FAILED') {
    return 'gagal'
  }
}

export function formatTransaction(payload: any) {
  return {
    ...payload,
    nominal: rupiah(payload.nominal),
    type: formatTransactionType(payload.type),
    status: formatTransactionStatus(payload.status),
    paymentMethod: formatPaymentMethod(payload.paymentMethod)
  }
}