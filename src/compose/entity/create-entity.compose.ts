import { ref, Ref, inject } from 'vue';
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

export function useCreateEntity(entityName: string) {

  type Result = CreateResult | CreateLoading | CreateError | CreateIdle;
  const result: Ref<Result> = ref({ type: 'idle' } as CreateIdle);
  const $q = useQuasar();
  const user = inject<Ref<any>>('user')

  async function createEntity(url: string, payload: any) {
    result.value = { type: 'loading' };
    if (!user || !user.value || !user.value.id) {
      $q.notify({
        type: 'negative',
        message: `Terjadi kesalahan autentikasi`,
        closeBtn: true
      })
      return
    }
    try {
      const response = await api.post(url, {
        ...payload
      });
      const { data } = response;
      result.value = { type: 'result', data };
      $q.notify({
        type: 'positive',
        message: `${SUCCESS_MESSAGE} ${entityName}`,
        closeBtn: true
      })
      return data;
    } catch (err) {
      console.log(err);
      $q.notify({
        type: 'negative',
        message: `${FAILURE_MESSAGE} ${entityName}`,
        closeBtn: true
      })
      result.value = { type: 'error', error: err };
    }
  }

  return {
    result,
    createEntity
  };
}
