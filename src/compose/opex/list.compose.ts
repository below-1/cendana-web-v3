import { reactive, ref, Ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

export function useListOpex() {
  const params = reactive({
    page: 0,
    perPage: 10,
    keyword: ''
  })

  const result: Ref<any> = ref({
    totalPage: 0,
    totalData: 0,
    items: []
  })

  const loading = ref(false)
  const customers: Ref<any[]> = ref([])
  const quasar = useQuasar()

  const getOpexes = async () => {
    loading.value = true
    const realParams = {
      ...params,
      type: 'OPEX'
    }
    try {
      const response = await api.get('/v1/api/transactions', { params: realParams })
      result.value = response.data
    } catch (err) {
      console.log(err)
      quasar.notify({
        type: 'negative',
        message: 'Gagal mengambil data'
      })
    } finally {
      loading.value = false
    }
  }

  watch(params, getOpexes)

  return {
    params,
    result,
    getOpexes,
    loading
  }
}