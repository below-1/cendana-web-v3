import { rupiah } from 'src/serv/currency'
import { format } from 'date-fns'
import { id as LocaleID } from 'date-fns/locale'

export const COLUMNS = [
  {
    name: 'id',
    align: 'left',
    field: 'id',
    label: 'id',
    required: true,
  },
  {
    name: 'waktu',
    align: 'left',
    field: 'createdAt',
    format: (v: string) => {
      const d = new Date(v)
      return format(d, 'd MMMM yyyy', { locale: LocaleID })
    },
    label: 'Tanggal',
    required: true,
  },
  {
    name: 'author',
    align: 'left',
    field: (row: any) => row.author.name,
    label: 'Admin',
    required: true,
  },
  {
    name: 'customer',
    align: 'left',
    field: (row: any) => row.targetUser.name,
    label: 'Pelanggan',
    required: true,
  },
  {
    name: 'grandTotal',
    align: 'left',
    field: 'grandTotal',
    label: 'Grand Total',
    format: (v: any) => rupiah(v),
    required: true,
  },
  {
    name: 'status',
    align: 'left',
    field: 'orderStatus',
    label: 'status',
    required: true,
  },
  {
    name: 'actions',
    align: 'right',
    field: 'id',
    label: '',
  },
];
