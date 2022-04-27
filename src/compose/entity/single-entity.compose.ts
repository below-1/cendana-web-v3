import { 
  ref, 
  isRef,
  unref,
  Ref 
} from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'boot/axios';

const FAILURE_MESSAGE = 'Gagal mengambil data';

interface SingleResult<T> {
  type: 'result';
  data: T;
}

interface SingleError {
  type: 'error';
  error: Error;
}

interface SingleLoading {
  type: 'loading';
}

export function useSingleEntity<T>(entityName: string) {
  type Result = SingleResult<T> | SingleLoading | SingleError;

  const result: Ref<Result> = ref({ type: 'loading' } as SingleLoading);
  const $q = useQuasar();

  async function getSingleEntity(url: string) {
    result.value = { type: 'loading' };
    try {
      const response = await api.get<T>(url);
      const { data } = response;
      result.value = { type: 'result', data };
      return data;
    } catch (err) {
      console.log(err);
      $q.notify({
        type: 'negative',
        message: `${FAILURE_MESSAGE} ${entityName}`,
        closeBtn: true
      });
      result.value = { type: 'error', error: err };
    }
  }

  return {
    result,
    getSingleEntity
  };
}
