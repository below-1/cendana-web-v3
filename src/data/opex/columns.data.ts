import { rupiah } from 'src/serv/currency'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

export const COLUMNS = [
  {
    name: 'id',
    align: 'left',
    field: 'id',
    label: 'id',
    required: true,
  },
  {
    name: 'ocat',
    align: 'left',
    field: (v: any) => v.opex.title,
    label: 'Kategori',
    required: true,
  },
  {
    name: 'waktu',
    align: 'left',
    field: 'createdAt',
    format: (v: string) => {
      const d = new Date(v)
      return format(d, 'd MMMM yyyy, HH:mm', { locale: id })
    },
    label: 'Waktu',
    required: true,
  },
  {
    name: 'nominal',
    align: 'left',
    field: 'nominal',
    format: rupiah,
    label: 'Nominal',
    required: true,
  },
  {
    name: 'description',
    align: 'left',
    field: 'description',
    label: 'Keterangan',
    required: true,
  },
  {
    name: 'actions',
    align: 'right',
    field: 'id',
    label: '',
  },
];
