import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'
import { BASE_API_URL } from 'src/data/supplier'

export function useCreate() {
  const router = useRouter()
  const quasar = useQuasar()
  const loading = ref(false)
  const create = async (payload: any) => {
    loading.value = true
    try {
      await api.post(BASE_API_URL, payload)
      quasar.notify({
        type: 'positive',
        message: 'Sukses menambah data supplier'
      })
      router.back()
    } catch (err) {
      console.log(err)
      quasar.notify({
        type: 'negative',
        message: 'Gagal menambah data supplier'
      })
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    create
  }
}