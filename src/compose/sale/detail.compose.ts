import { Ref, ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import { Result, Loading } from 'src/models/result.model'


export function useDetailSale(id: Ref<string | number>) {
  const sale: Ref<Result<any>> = ref({
    type: 'loading'
  } as Loading)
  const quasar = useQuasar()

  async function getSale() {
    sale.value = {
      type: 'loading'
    }
    const url = `/v1/api/sales/${id.value}`
    try {
      const response = await api.get(url)
      const { data } = response
      sale.value = {
        type: 'data',
        item: data
      }
      return data
    } catch (err) {
      console.log(err)
      sale.value = {
        type: 'fail',
        error: err
      }
      quasar.notify({
        type: 'negative',
        message: 'Gagal mengambil data penjualan'
      })
    }
  }

  watch(id, getSale)

  return {
    sale,
    getSale
  }
}
