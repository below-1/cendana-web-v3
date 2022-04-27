import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import { BASE_API_URL } from 'src/data/supplier'


export function useUpdate() {
  const quasar = useQuasar()
  const loading = ref(false)
  const update = async (id: string | number, payload: any) => {
    const url = `${BASE_API_URL}/${id}`
    loading.value = true
    try {
      await api.put(url, payload)
      quasar.notify({
        type: 'positive',
        message: 'Sukses mengubah data supplier'
      })
    } catch (err) {
      console.log(err)
      quasar.notify({
        type: 'negative',
        message: 'Gagal mengubah data supplier'
      })
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    update
  }
}