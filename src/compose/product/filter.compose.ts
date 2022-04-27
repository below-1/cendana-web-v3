import { ref, reactive, watch } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import { Product } from 'src/models/product.model'

export function useFilterProduct() {
  const result = ref({
    totalPage: 0,
    totalData: 0,
    items: ([] as Product[])
  })
  const parameters = reactive({
    keyword: '',
    page: 0,
    perPage: -1
  })
  const $q = useQuasar()
  
  const getProducts = async () => {
    try {
      const response = await api.get('/v1/api/products', { params: { ...parameters } })
      const { data } = response
      result.value = data
      return result
    } catch (err) {
      console.log(err)
      $q.notify({
        type: 'negative',
        message: 'gagal mengambil data produk'
      })
    }
  }

  watch(parameters, getProducts)

  return {
    result,
    parameters,
    getProducts
  }
}