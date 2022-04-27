import { rupiah } from 'src/serv/currency'
import Decimal from 'decimal.js'

export const COLUMNS = [
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
    field: 'quantity',
    label: 'QTY',
    required: true,
  },
  {
    name: 'subtot',
    align: 'left',
    field: (v: any) => {
      const priceQTY = (new Decimal(v.sellPrice)).mul(new Decimal(v.quantity))
      const subtot = priceQTY.sub(priceQTY.mul(new Decimal(v.discount / 100)))
      return rupiah(subtot.toString())
    },
    label: '',
    required: true,
  },
  {
    name: 'actions',
    align: 'right',
    field: 'id',
    label: '',
  },
]