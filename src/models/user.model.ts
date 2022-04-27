/* eslint-disable camelcase */
export type User = {
  id: number;
  username: string;
  name: string;
  mobile?: string;
  email?: string;
  registered_at?: string;
  last_login?: string;
  address?: string;
  role: 'ADMIN' | 'SUPPLIER' | 'CUSTOMER' | 'EMPLOYER';
};
