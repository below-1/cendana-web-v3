import { inject, Ref, ref } from 'vue'
import { api } from 'boot/axios'
import { User } from 'src/models/user.model'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

export function useSeal() {
  const user = inject<Ref<User>>('user')
  const quasar = useQuasar()
  const router = useRouter()
  const loading = ref(false)

  const seal = async (purchaseId: string | number, payload: any) => {
    loading.value = true
    if (!user) {
      throw new Error(`user is undefined`)
    }
    const authorId = user.value.id
    const realPayload = {
      ...payload,
      authorId
    }
    const url = `/v1/api/purchases/${purchaseId}/seal`
    try {
      await api.put(url, realPayload)
      quasar.notify({
        type: 'positive',
        message: 'Pembelian berhasil dikunci'
      })
    } catch (err) {
      console.log(err)
      quasar.notify({
        type: 'negative',
        message: 'Gagal mengunci pembelian'
      })
    } finally {
      loading.value = false
      router.back()
    }
  }

  return { seal, loading }
}
