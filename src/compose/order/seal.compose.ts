import { inject, Ref, ref } from 'vue'
import { api } from 'boot/axios'
import { User } from 'src/models/user.model'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

export enum OrderType {
  PURCHASE = 'purchases',
  SALE = 'sales'
}

export function useSeal(orderType: OrderType) {
  const user = inject<Ref<User>>('user')
  const quasar = useQuasar()
  const router = useRouter()
  const loading = ref(false)

  const seal = async (saleId: string | number, payload: any) => {
    loading.value = true
    if (!user) {
      throw new Error(`user is undefined`)
    }
    const authorId = user.value.id
    const realPayload = {
      ...payload,
      authorId
    }
    const url = `/v1/api/${orderType}/${saleId}/seal`
    try {
      await api.put(url, realPayload)
      quasar.notify({
        type: 'positive',
        message: 'Penjualan berhasil dikunci'
      })
    } catch (err) {
      console.log(err)
      quasar.notify({
        type: 'negative',
        message: 'Gagal mengunci Penjualan'
      })
    } finally {
      loading.value = false
      router.back()
    }
  }

  return { seal, loading }
}
