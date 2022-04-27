import { ref, Ref } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'boot/axios';

const SUCCESS_MESSAGE = 'Sukses mengubah data';
const FAILURE_MESSAGE = 'Gagal mengubah data';

interface CreateResult {
  type: 'result';
  data: any;
}

interface CreateError {
  type: 'error';
  error: Error;
}

interface CreateLoading {
  type: 'loading';
}

interface CreateIdle {
  type: 'idle';
}

type Result = CreateResult | CreateLoading | CreateError | CreateIdle;

interface CreateOptions {
  entityName: string;
  transform?: (payload: any) => any;
}

export function useCreateEntityV2(options: CreateOptions) {
  const result: Ref<Result> = ref({ type: 'idle' } as CreateIdle)
  const $q = useQuasar()

  async function createEntity(url: string, payload: any) {
    result.value = { type: 'loading' }

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
      const response = await api.post(url, realPayload)
      const { data } = response
      result.value = { type: 'result', data }
      $q.notify({
        type: 'positive',
        message: `${SUCCESS_MESSAGE} ${options.entityName}`,
        closeBtn: true
      })
      return data;
    } catch (err) {
      console.log(err);
      $q.notify({
        type: 'negative',
        message: `${FAILURE_MESSAGE} ${options.entityName}`,
        closeBtn: true
      })
      result.value = { type: 'error', error: err };
    }
  }

  return {
    result,
    createEntity
  }
}
