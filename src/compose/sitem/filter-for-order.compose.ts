import { computed, ref, Ref, reactive, watch } from 'vue'
import { useQuasar } from 'quasar';
import { api } from 'boot/axios'
import { StockItem } from 'src/models/stock-item.model';

export interface Loading {
  type: 'loading';
}

export interface Data {
  type: 'data';
  items: StockItem[];
}

export interface Error {
  type: 'error';
  error: any;
}

type Result = Loading | Data | Error


export function useFilterForOrder(order: Ref<string | number>) {
  const params = reactive({
    page: 0,
    perPage: 10
  })
  const stockItems: Ref<Result> = ref({
    type: 'data',
    items: []
  } as Result);
  const $q = useQuasar()

  const getStockItems = async () => {
    stockItems.value = { type: 'loading' }
    const realParams = { ...params, target: order.value, type: 'ORDER' }
    try {
      const response = await api.get('/v1/api/stock-items', { params: realParams })
      stockItems.value = { type: 'data', items: response.data };
    } catch (err) {
      stockItems.value = { type: 'error', error: err };
      $q.notify({
        type: 'negative',
        message: 'Gagal mengambil data Item Pembelian'
      })
    }
  }

  watch(params, getStockItems)

  return {
    params,
    stockItems,
    getStockItems
  }
}