import { ref, Ref, reactive, watch, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'boot/axios';

const FAILURE_MESSAGE = 'Gagal mengambil data';

export interface ListLoading {
  type: 'loading';
}

export interface ListError {
  type: 'error';
  error: any;
}

interface InnerResult<T> {
  items: T[];
  totalPage: number;
  totalData: number;
}

export interface ListResult<T> extends InnerResult<T> {
  type: 'result';
}

export type Filter = {
  page: number;
  perPage: number;
  keyword?: string;
};

type ListEntityOptions = {
  url: string;
  name: string;
};

export function useOptionsEntity<T>(options: ListEntityOptions) {
  type Result = ListResult<T> | ListLoading | ListError;
  const params = {
    page: 0,
    perPage: -1,
  };
  const result: Ref<Result> = ref({
    type: 'loading'
  } as ListLoading);
  const $q = useQuasar();

  async function getEntityList() {
    result.value = { type: 'loading' };
    try {
      const response = await api.get<InnerResult<T>>(options.url, { params });
      const { data } = response;
      const wrappedData: ListResult<T> = {
        ...data,
        type: 'result'
      };
      result.value = wrappedData;
    } catch (err) {
      console.log(err);
      $q.notify({
        type: 'negative',
        message: `${FAILURE_MESSAGE} ${options.name}`,
        closeBtn: true
      })
      result.value = { type: 'error', error: err };
    }
  }

  watch(params, getEntityList);
  onMounted(getEntityList);

  return {
    params,
    result,
    getEntityList,
  };
}
