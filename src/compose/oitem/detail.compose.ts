import { Ref, ref } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'


export function useDetailSaleItem(id: Ref<string | number>) {

  const getProduct = async (productId: string | number) => {
    const response = await api.get(`/v1/api/products/${productId}`)
    return response.data
  }

  const getLatestStock = async (productId: string | number) => {
    const response = await api.get(`/v1/api/latest-stock/${productId}`)
    return response.data
  }

  const getOrderItem = async (orderItemId: string | number) => {
    const response = await api.get(`/v1/api/order-items/${orderItemId}`)
    return response.data 
  }

  const result = ref<any>({
    type: 'loading'
  })

  const quasar = useQuasar()
  const getDetail = async () => {
    result.value = { type: 'loading' }
    const idVal = id.value
    try {
      const orderItem = await getOrderItem(idVal)
      const product = await getProduct(orderItem.productId)
      const latestStock = await getLatestStock(product.id)
      result.value = {
        type: 'data',
        orderItem,
        product,
        latestStock
      }
    } catch (err) {
      console.log(err)
      result.value = {
        type: 'error',
        error: err
      }
      quasar.notify({
        type: 'negative',
        message: 'Terjadi kesalahan saat mengambil data item Penjualan'
      })
    }
    return result.value
  }

  return { getDetail, result }
}
