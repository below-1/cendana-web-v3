import { unref, ref, Ref } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

type Data = {
  type: 'data';
  item: any;
}

type Failure = {
  type: 'fail';
  error: Error;
}

type Loading = {
  type: 'loading';
}

type Result = Data | Failure | Loading

export function useDetailPurchase(id: Ref<string | number>) {
  const $q = useQuasar()
  const purchase: Ref<Result> = ref({ type: 'loading' } as Result)
  const getPurchase = async () => {
    const idValue = unref(id)
    const url = `/v1/api/purchases/${idValue}`
    purchase.value = { type: 'loading' }
    try {
      const response = await api.get(url)
      purchase.value = { type: 'data', item: response.data }
      return purchase.value
    } catch (err) {
      console.log(err)
      $q.notify({
        type: 'negative',
        message: 'Gagal mengambil data pembelian'
      })
    }
  }

  return {
    purchase,
    getPurchase
  }
}