import { reactive, ref, Ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { findCustomers } from 'src/serv/customer'

export function useListCustomer() {
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

  const getCustomers = async () => {
    loading.value = true
    try {
      const data = await findCustomers(params)
      result.value = data
      return data
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

  watch(params, getCustomers)

  return {
    params,
    result,
    getCustomers,
    loading
  }
}