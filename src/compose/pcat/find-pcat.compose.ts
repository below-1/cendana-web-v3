import { ref, Ref, reactive, watch } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

type Data = {
  type: 'data';
  totalData: number;
  totalPage: number;
  items: any[];
}

type Fail = {
  type: 'fail';
  error: Error;
}

type Loading = {
  type: 'loading';
}

type Result = Data | Fail | Loading;

export function useFindProductCategories() {
  const params = reactive({
    keyword: '',
    page: 0,
    perPage: 10
  })
  const result: Ref<Result> = ref({
    type: 'data',
    totalData: 0,
    totalPage: 0,
    items: []
  } as Data)

  const quasar = useQuasar()

  const getProductCategories = async () => {
    result.value = { type: 'loading' }
    try {
      const response = await api.get('/v1/api/product-categories', { params: { ...params } })
      result.value = {
        type: 'data',
        ...response.data
      }
    } catch (err) {
      console.log(err)
      result.value = { type: 'fail', error: err };
      quasar.notify({
        type: 'negative',
        message: 'Gagal mengambil data Kategori Produk'
      })
    }
    return result.value
  }

  watch(params, getProductCategories)

  return {
    result,
    params,
    getProductCategories
  }
}