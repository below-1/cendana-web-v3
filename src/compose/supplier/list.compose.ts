import { ref, reactive, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

export function useListSupplier() {
  const suppliers  = ref([] as any[])
  const quasar = useQuasar()
  const getSuppliers = async () => {
    try {
      const response = await api.get('/v1/api/users/suppliers')
      suppliers.value = response.data.items
    } catch (err) {
      console.log(err)
      quasar.notify({
        type: 'negative',
        message: 'gagal mengambil data supplier'
      })
    }
  }

  return {
    suppliers,
    getSuppliers
  }
}
