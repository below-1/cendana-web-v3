export const CREATE_FIELDS = [  
  {
    control: 'select',
    name: 'targetUserId',
    label: 'Supplier',
    field: 'targetUserId',
    multiple: false,
    // The client should modify this...
    options: [],
  },
  {
    control: 'textarea',
    name: 'description',
    label: 'Keterangan',
    field: 'description',
  },
  {
    control: 'datetime',
    name: 'createdAt',
    label: 'Waktu',
    field: 'createdAt',
  }
];
