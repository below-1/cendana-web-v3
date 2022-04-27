import {
  ref,
  unref,
  Ref,
  reactive
} from 'vue'
import Decimal from 'decimal.js'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

export function useListSales(productId: Ref<string | number>) {
  const params = reactive({
    page: 0,
    perPage: 10
  })

  const result = ref<any>({
    type: 'loading'
  })
  const quasar = useQuasar()
  const getSales = async () => {
    result.value = {
      type: 'loading'
    }
    const productIdVal = unref(productId)
    const url = `/v1/api/products/${productIdVal}/sales`
    try {
      const response = await api.get(url, { params })
      const { data } = response
      let { items } = data
      items = items.map((it: any) => {
        let { quantity, discount, sellPrice } = it
        const decPrice = new Decimal(sellPrice)
        const decQty = new Decimal(quantity)
        const decDiscount = new Decimal(discount).div(new Decimal(100))
        const priceQty = decPrice.mul(decQty)
        const totalDisc = priceQty.mul(decDiscount)
        const total = priceQty.sub(totalDisc)
        return {
          ...it,
          total
        }
      })
      result.value = {
        type: 'data',
        ...data,
        items
      }
      console.log(result.value)
    } catch (err) {
      console.log(err)
      quasar.notify({
        type: 'negative',
        message: 'Gagal mengambil data penjualan'
      })
    }
  }

  return { 
    params,
    result,
    getSales
  }
}