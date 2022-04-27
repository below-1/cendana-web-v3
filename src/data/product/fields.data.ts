export const CREATE_FIELDS = [
  {
    control: 'string',
    name: 'name',
    label: 'Nama Produk',
    field: 'name',
  },
  {
    control: 'string',
    name: 'unit',
    label: 'Unit',
    field: 'unit',
  },
  {
    control: 'select',
    name: 'categories',
    label: 'Kategori',
    field: 'categories',
    multiple: true,
    // The client should modify this...
    options: [],
    
  },
];

export const UPDATE_FIELDS = [
  {
    control: 'string',
    name: 'name',
    label: 'Nama Produk',
    field: 'name',
  },
  {
    control: 'string',
    name: 'unit',
    label: 'Unit',
    field: 'unit',
  },
  {
    control: 'select',
    name: 'categories',
    label: 'Kategori',
    field: 'categories',
    multiple: true,
    // The client should modify this...
    options: [],
    
  },
];
