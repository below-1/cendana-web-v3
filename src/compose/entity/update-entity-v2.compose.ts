import { ref, Ref } from 'vue';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';

const SUCCESS_MESSAGE = 'Sukses mengubah data';
const FAILURE_MESSAGE = 'Gagal mengubah data';

interface UpdateResult {
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

interface UpdateOptions {
  entityName: string
  transform?: (payload: any) => any
}

export function useUpdateEntityV2(options: UpdateOptions) {
  const $q = useQuasar();
  const result: Ref<Result> = ref({ type: 'idle' } as UpdateIdle);

  async function updateEntity(url: string, payload: any) {
    result.value = { type: 'loading' };

    let realPayload: any
    if (options.transform) {
      try {
        realPayload = options.transform(payload)
      } catch (err) {
        console.log(err)
        $q.notify({
          type: 'negative',
          message: `Proses inputan gagal`
        })
        return
      }
    } else {
      realPayload = { ...payload }
    }

    try {
      const response = await api.put(url, realPayload)
      const { data } = response
      result.value = { type: 'result' }
      $q.notify({
        type: 'positive',
        message: `${SUCCESS_MESSAGE} ${options.entityName}`,
        closeBtn: true
      })
      return data
    } catch (err) {
      console.log(err);
      $q.notify({
        type: 'negative',
        message: `${FAILURE_MESSAGE} ${options.entityName}`,
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
