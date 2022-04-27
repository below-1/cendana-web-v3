import { api } from 'boot/axios'

type Params = {
  page: number;
  perPage: number;
  keyword: string;
}

export async function findCustomers(params: Params) {
  const response = await api.get('/v1/api/users/customers', { params })
  const { data } = response
  return data
}