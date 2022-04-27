type HeaderMenu = { separator: true, label: string };
type PathMenu = { path: string, label: string, icon: string };
type HasChildren = { label: string, icon: string; children: PathMenu[] }
export type Menu = HeaderMenu | PathMenu | HasChildren;

export const baseMenus: Menu[] = [
  { path: '/app/dashboard', label: 'dashboard', icon: 'dashboard' },
  { 
    label: 'Master', 
    icon: 'folder',
    children: [
      { path: '/app/pcat', label: 'kategori barang', icon: 'category' },
      { path: '/app/ocat', label: 'kategori beban usaha', icon: 'category' },
      { path: '/app/tcat', label: 'kategori Peralatan', icon: 'category' },
      { path: '/app/invcat', label: 'kategori Investasi', icon: 'category' },
      { path: '/app/product', label: 'gudang', icon: 'bento' },
      { path: '/app/supplier', label: 'supplier', icon: 'bento' },
      { path: '/app/customer', label: 'pelanggan', icon: 'bento' }
    ]
  },
  {
    label: 'pemasukan',
    icon: 'paid',
    children: [
      { path: '/app/sale', label: 'penjualan', icon: 'point_of_sale' },
      { path: '/app/delay-receivable', label: 'Piutang', icon: 'send_and_archive' },
      { path: '/app/investment', label: 'Investasi', icon: 'rowing' }
    ]
  },
  {
    label: 'pengeluaran',
    icon: 'paid',
    children: [
      { path: '/app/purchase', label: 'pembelian', icon: 'point_of_sale' },
      { path: '/app/delay-payable', label: 'Hutang', icon: 'send_and_archive' },
      { path: '/app/opex', label: 'beban usaha', icon: 'rowing' },
      { path: '/app/tool', label: 'biaya peralatan', icon: 'production_quantity_limits' },
      { path: '/app/equity', label: 'Perubahan Modal', icon: 'rowing' },
    ]
  }
];

export const adminMenus: Menu[] = [
  { 
    path: '/app/finance', 
    label: 'laporan keuangan', 
    icon: 'bar_chart',
    children: [
      { 
        label: 'Laba Rugi', 
        icon: 'sync_alt', 
        path: '/app/finance/laba_rugi'
      },
      { label: 'Neraca', 
        icon: 'scale',
        path: '/app/finance/neraca'
      },
      { 
        label: 'Arus Kas', 
        icon: 'ait', 
        path: '/app/finance/arus_kas' 
      },
      { 
        label: 'Perubahan Modal', 
        icon: 'ait', 
        path: '/app/finance/perubahan_modal' 
      }
    ]
   },
  { label: 'user', icon: 'person',
    children: [
      { path: '/app/staf', label: 'staf', icon: 'person' },
      { path: '/app/admin', label: 'admin', icon: 'person' }
    ]
  }
];
