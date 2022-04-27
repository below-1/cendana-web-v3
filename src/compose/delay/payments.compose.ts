import { 
  Ref,
  computed,
  ref,
  unref
} from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

export function usePayments(id: Ref<string | number>) {
  const $quasar = useQuasar()
  const $payments = ref([])
  const $url = computed(() => `/v1/api/delays/${id.value}/payments`)
  const getPayments = async () => {
    const url = unref($url)
    try {
      const response = await api.get(url)
      const { data } = response
      $payments.value = data
    } catch (err) {
      console.log(err)
      $quasar.notify({
        message: 'Gagal mengambil data pembayaran',
        type: 'negative'
      })
    }
  }

  return {
    getPayments,
    payments: $payments
  }
}