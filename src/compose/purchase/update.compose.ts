import { inject, Ref, ref } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

export function useUpdate() {
  const quasar = useQuasar()
  const router = useRouter()
  const loading = ref(false)

  const update = async (purchaseId: string | number, payload: any) => {
    loading.value = true
    const url = `/v1/api/purchases/${purchaseId}`
    try {
      await api.put(url, payload)
      quasar.notify({
        type: 'positive',
        message: 'Pembelian berhasil diupdate'
      })
    } catch (err) {
      console.log(err)
      quasar.notify({
        type: 'negative',
        message: 'Gagal mengunci diupdate'
      })
    } finally {
      loading.value = false
    }
  }

  return { update, loading }
}
