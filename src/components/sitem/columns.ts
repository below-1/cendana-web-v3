import { rupiah } from 'src/serv/currency'

export default [
  {
    name: 'id',
    align: 'left',
    field: 'id',
    label: 'id',
    required: true,
  },
  {
    name: 'product',
    align: 'left',
    field: (row: any) => row.product.name,
    label: 'Produk',
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
    name: 'discount',
    align: 'left',
    field: 'discount',
    format: (v: any) => v + ' %',
    label: 'Diskon',
    required: true,
  },
  {
    name: 'quantity',
    align: 'left',
    field: (row: any) => row.available + row.defect,
    label: 'QTY',
    required: true,
  },
  {
    name: 'available',
    align: 'left',
    field: 'available',
    label: 'Baik',
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
    name: 'actions',
    align: 'right',
    field: 'id',
    label: '',
  },
]