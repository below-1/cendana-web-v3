import { api } from 'boot/axios';

type Option = {
  value: number;
  label: string;
}
type Transform = (data: any) => Option;

const defaultTransform = (d: any) => {
  const label = d.name ? d.name : d.title;
  return {
    value: d.id as number,
    label: label as string
  }
}

const defaultParams = {
  page: 0,
  perPage: -1,
  keyword: ''
};

export async function getOptionsEntity(url: string, params?: any, transform?: Transform): Promise<Option[]> {
  const p = params ? params : defaultParams;
  const response = await api.get<any>(url, { params: p });
  const data = response.data;
  const f = transform ? transform : defaultTransform;
  return data.items.map(f);
}
