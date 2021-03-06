import { rupiah } from 'src/serv/currency'

export const COLUMNS = [
  {
    name: 'id',
    align: 'left',
    field: 'id',
    label: 'id',
    required: true,
  },
  {
    name: 'name',
    align: 'left',
    field: 'name',
    label: 'Nama',
    required: true,
  },
  {
    name: 'buyPrice',
    align: 'left',
    field: 'buyPrice',
    label: 'Harga Beli',
    format: (v: any) => rupiah(v),
    required: true,
  },
  {
    name: 'sellPrice',
    align: 'left',
    field: 'sellPrice',
    label: 'Harga Jual',
    format: (v: any) => rupiah(v),
    required: true,
  },
  {
    name: 'available',
    align: 'left',
    field: 'available',
    label: 'Tersedia',
    required: true,
  },
  {
    name: 'sold',
    align: 'left',
    field: 'sold',
    label: 'Terjual',
    required: true,
  },
  {
    name: 'defect',
    align: 'left',
    field: 'defect',
    label: 'Rusak',
    required: true,
  },
  {
    name: 'returned',
    align: 'left',
    field: 'returned',
    label: 'Retur',
    required: true,
  },
  {
    name: 'unit',
    align: 'left',
    field: 'unit',
    label: 'Unit',
    required: true,
  },
  {
    name: 'actions',
    align: 'right',
    field: 'id',
    label: '',
  },
];
