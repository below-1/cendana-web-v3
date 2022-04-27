import { ref, Ref } from 'vue';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';

const SUCCESS_MESSAGE = 'Sukses mengubah data';
const FAILURE_MESSAGE = 'Gagal mengubah data';

export interface UpdateResult {
  type: 'result';
}

interface UpdateError {
  type: 'error';
  error: Error;
}

interface UpdateLoading {
  type: 'loading';
}

interface UpdateIdle {
  type: 'idle';
}

type Result = UpdateResult | UpdateLoading | UpdateError | UpdateIdle;

export function useUpdateEntity(entityName: string) {
  const $q = useQuasar();
  const result: Ref<Result> = ref({ type: 'idle' } as UpdateIdle);

  async function updateEntity(url: string, payload: any) {
    result.value = { type: 'loading' };
    try {
      const response = await api.put(url, payload);
      const { data } = response;
      result.value = { type: 'result' };
      $q.notify({
        type: 'positive',
        message: `${SUCCESS_MESSAGE} ${entityName}`,
        closeBtn: true
      })
    } catch (err) {
      console.log(err);
      $q.notify({
        type: 'negative',
        message: `${FAILURE_MESSAGE} ${entityName}`,
        closeBtn: true
      })
      result.value = { type: 'error', error: err };
    }
    return result.value
  }

  return {
    result,
    updateEntity
  };
}
