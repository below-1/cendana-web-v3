import {
  ref,
  unref,
  Ref,
  reactive
} from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

export function useListPurchases(productId: Ref<string | number>) {
  const params = reactive({
    page: 0,
    perPage: 10
  })

  const result = ref<any>({
    type: 'loading'
  })
  const quasar = useQuasar()
  const getPurchases = async () => {
    result.value = {
      type: 'loading'
    }
    const productIdVal = unref(productId)
    const url = `/v1/api/products/${productIdVal}/purchases`
    try {
      const response = await api.get(url, { params })
      const { data } = response
      result.value = {
        type: 'data',
        ...data
      }
      console.log(result.value)
    } catch (err) {
      console.log(err)
      quasar.notify({
        type: 'negative',
        message: 'Gagal mengambil data pembelian'
      })
    }
  }

  return { 
    params,
    result,
    getPurchases
  }
}