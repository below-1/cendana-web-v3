import { 
  ref, 
  unref,
  isRef,
  Ref, 
  reactive, 
  watch, 
  onMounted
} from 'vue';
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

const FAILURE_MESSAGE = 'Gagal mengambil data';

interface Loading {
  type: 'loading';
}

interface Fail {
  type: 'error';
  error: any;
}

interface Data<T> {
  type: 'data';
  items: T[];
  totalPage: number;
  totalData: number;
}

interface ListEntityOptions<U> {
  url: string | Ref<string>;
  name: string;
}

export function useFilterEntity<T>(options: any) {
  let rawParams: any = {
    page: 0,
    perPage: 10
  };
  if (options.initialParams) {
    rawParams = { ...rawParams, ...options.initialParams };
  }

  const params = reactive({...rawParams})

  type Result = Loading | Fail | Data<T>;
  const initialResult: Result = {
    type: 'data',
    items: [],
    totalPage: 0,
    totalData: 0
  } as Result
  const result = ref(initialResult)

  const quasar = useQuasar()

  async function getEntities() {
    result.value = {
      type: 'loading'
    }
    const url = isRef(options.url) ? unref(options.url) : options.url
    try {
      const response = await api.get(url, { params })
      const { data } = response
      result.value = {
        type: 'data',
        ...data
      }
      return data
    } catch (err) {
      console.log(err)
      quasar.notify({
        type: 'negative',
        message: `${FAILURE_MESSAGE} ${options.name}`
      })
    }
  }

  watch(params, getEntities)

  return {
    params,
    getEntities,
    result
  }
}
