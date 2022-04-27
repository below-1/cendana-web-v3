import { ref, Ref } from 'vue';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';

const BASE_TITLE = 'Anda akan menghapus data';
const BASE_MESSAGE = 'Menghapus data pada satu tabel akan mempengaruhi data pada tabel yang lain. Lakukan dengan hati - hati!';
const SUCCESS_MESSAGE = 'Sukses menghapus data';
const FAILURE_MESSAGE = 'Gagal menghapus data';

export interface RemoveLoading {
  type: 'loading';
}

export interface RemoveResult {
  type: 'result';
}

export interface RemoveError {
  type: 'error';
  error: any;
}

export interface RemoveIdle {
  type: 'idle';
}

export type Result = RemoveError | RemoveLoading | RemoveResult | RemoveIdle;

export function useRemoveEntity(entityName: string) {
  const result: Ref<Result> = ref({ type: 'idle' } as RemoveIdle)
  const $q = useQuasar();

  const remove = async (url: string) => {
    result.value = { type: 'loading' };
    try {
      await api.delete(url);
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
  };

  const promptRemove = (url: string, label: any) => {
    const promptResult = new Promise<boolean>((resolve, reject) => {
      $q.dialog({
        title: `${BASE_TITLE} ${entityName} #${label}?`,
        message: BASE_MESSAGE,
        ok: 'lanjutkan',
        cancel: 'batalkan'
      })
        .onOk(() => {
          remove(url)
            .then(() => {
              resolve(true)
            })
            .catch(err => {
              reject(err)
            })
        })
        .onDismiss(() => {
          resolve(false)
        })
        .onCancel(() => {
          resolve(false)
        })
    });
    return promptResult
  };

  return {
    result,
    remove,
    promptRemove,
  }
}
