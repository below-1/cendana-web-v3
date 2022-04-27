export enum PaymentMethod {
  OFFLINE = 'OFFLINE',
  CASH = 'CASH',
  ON_DELIVERY = 'ON_DELIVERY',
  CHEQUE_DRAFT = 'CHEQUE_DRAFT',
  WIRED = 'WIRED',
  ONLINE = 'ONLINE'
}

export const PAYMENT_METHOD_OPTIONS = [
  { label: 'Offline', value: PaymentMethod.OFFLINE },
  { label: 'Kes', value: PaymentMethod.CASH },
  { label: 'On Delivery', value: PaymentMethod.ON_DELIVERY },
  { label: 'Check', value: PaymentMethod.CHEQUE_DRAFT },
  { label: 'Online', value: PaymentMethod.ONLINE }
]

export enum TransactionStatus {
  NEW = 'NEW',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
  DECLINED = 'DECLINED',
  REJECTED = 'REJECTED',
  SUCCESS = 'SUCCESS'
}

export const TRANSACTION_STATUS_OPTIONS = [
  { label: 'Berhasil', value: TransactionStatus.SUCCESS },
  { label: 'Baru', value: TransactionStatus.NEW },
  { label: 'Batal', value: TransactionStatus.CANCELLED },
  { label: 'Gagal', value: TransactionStatus.FAILED },
  { label: 'Pending', value: TransactionStatus.PENDING },
  { label: 'Declined', value: TransactionStatus.DECLINED },
  { label: 'Reject', value: TransactionStatus.REJECTED }
]

export enum TransactionType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT'
}

export const TRANSACTION_TYPE_OPTIONS = [
  { label: 'Pemasukan', value: TransactionType.DEBIT },
  { label: 'Pengeluaran', value: TransactionType.CREDIT }
]
